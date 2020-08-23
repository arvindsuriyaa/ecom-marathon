/* eslint-disable array-callback-return */
import React, { Component } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import "react-table-v6/react-table.css";
import "../../styles/Table.scss";
import * as styles from "../../styles/TableStyles.module.scss";
import ReactTable from "react-table-v6";
import ColumnData from "./ListingComponents/ColumnData";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import bindDispatch from "../../utils/bindDispatch";
import * as fetchApi from "../../api/apiAction";
import DialogBox from "../common/DialogBox";
import _ from "lodash";
import { initialState } from "../../store/reducer/reducer";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCollection: [],
      column: [],
      showStatus: <CircularProgress />,
      showAction: false,
      rowIndex: null,
      searchInput: "",
    };
    this.checkboxRef = React.createRef();
  }
  handleSort = async (props) => {
    const { reducer, actions } = this.props;
    const { toggleIcon } = reducer;
    const toggle = { ...toggleIcon };
    let toggleFlag = Object.entries(toggle);
    toggleFlag.map((flag) => {
      flag[1] = false;
    });
    let toggleSort = Object.fromEntries(toggleFlag);
    toggleSort[`${props[0].id}Sort`] = !props[0].desc;
    await actions.assignData("toggleIcon", toggleSort);
    this.updateColumn();
  };

  findWord = (word, searchInput) => {
    return (
      (word.toLowerCase().includes(searchInput.toLowerCase()) ||
        word.toString().toLowerCase().includes(searchInput.toLowerCase())) &&
      searchInput.length
    );
  };

  highlightText = (word, index, searchInput) => {
    let newText = [
      word.substring(0, index),
      <span className={styles.highlight}>
        {word.substring(index, index + searchInput.length)}
      </span>,
      word.substring(index + searchInput.length),
    ];
    return newText;
  };

  filterList = (accumulator = [], val) => {
    let { searchInput } = this.state;
    if (!searchInput) {
      accumulator.push(val);
      return accumulator;
    }
    let isLetter = false;
    for (const key in val) {
      if (val[key].length || val[key] !== "" || val[key] !== null) {
        let word = val[key].toString();
        let isWord = this.findWord(word, searchInput);
        if (isWord) {
          let index =
            word.toLowerCase().indexOf(searchInput.toLowerCase()) || 0;
          val[key] = this.highlightText(word, index, searchInput);
          isLetter = true;
        }
      }
    }
    if (isLetter) {
      accumulator.push(val);
    }
    return accumulator;
  };

  filteredData = async () => {
    let response = await fetchApi.getAllUsers();
    let clonedArray = _.cloneDeep(response.data);

    let individualList = clonedArray.reduce(this.filterList, []);
    this.setState(
      {
        userCollection: individualList,
      },
      () => {
        this.updateColumn();
      }
    );
  };
  handleSearchFilter = (event) => {
    this.setState({ searchInput: event.target.value }, () => {
      this.filteredData();
    });
  };

  handleEdit = async (row) => {
    const { actions, history } = this.props;
    let response = await fetchApi.getUsersById(row.original.id);
    await actions.resetForm(initialState);
    let editInfo = response.data;
    const {
      addressDetails,
      qualificationDetails,
      token,
      isDeleted,
      ...personalDetails
    } = editInfo;
    await actions.assignData("personalDetails", personalDetails);
    await actions.assignData("qualificationDetails", qualificationDetails);
    await actions.assignData("addressDetails", addressDetails);
    actions.assignData("isEdit", true);
    history.push("/Form");
  };

  handleDelete = async (row) => {
    const { userCollection } = this.state;
    let userInfo = [...userCollection];
    await fetchApi.deleteAPI(row.original.id);
    userInfo.splice(row.index, 1);
    this.setState({ userCollection: userInfo }, () => {
      this.updateColumn();
    });
  };

  updateColumn = () => {
    const { reducer } = this.props;
    const { toggleIcon } = reducer;
    const columnDetails = {
      toggleIcon: toggleIcon,
      userHistory: this.state.userCollection,
      handleDelete: this.handleDelete,
      handleEdit: this.handleEdit,
    };
    this.setState({
      column: ColumnData(columnDetails),
      showStatus: `No data Found`,
    });
  };

  async componentDidMount() {
    let response = await fetchApi.getAllUsers();
    if (response.request.status === 201) {
      this.setState(
        {
          userCollection: response.data,
        },
        () => {
          this.updateColumn();
        }
      );
    } else {
      this.setState({ showStatus: <DialogBox size={100} /> });
    }
  }

  render() {
    const { history } = this.props;
    const { userCollection } = this.state;
    return (
      <div>
        {this.state.showStatus === "No data Found" ? (
          <>
            <div className={styles.title}>
              <h2>Individual List({userCollection.length})</h2>
              <div className={styles.filterSection}>
                <span className={styles.search}>
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  name="searchInput"
                  value={this.state.searchInput || ""}
                  className={styles.searchFilter}
                  onChange={this.handleSearchFilter}
                  placeholder="Search...."
                  disabled={this.state.showStatus !== "No data Found"}
                />
                <Button
                  className={styles.addNew}
                  onClick={() => history.push("/Form")}
                  disabled={this.state.showStatus !== "No data Found"}
                >
                  +Add New
                </Button>
              </div>
            </div>
            {userCollection.length ? (
              <ReactTable
                data={this.state.userCollection}
                onSortedChange={(props) => this.handleSort(props)}
                minRows={0}
                showPagination={false}
                NoDataComponent={() => null}
                columns={this.state.column}
              />
            ) : (
              <center>
                <h1>{this.state.showStatus}</h1>
              </center>
            )}
          </>
        ) : (
          <div className={styles.progress}>
            <h1>{this.state.showStatus}</h1>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(Table);

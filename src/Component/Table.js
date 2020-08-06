import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "react-table-v6/react-table.css";
import "../styles/Table.scss";
import * as styles from "../styles/TableStyles.module.scss";
import ReactTable from "react-table-v6";
import ColumnData from "./TableComponents/ColumnData";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import bindDispatch from "../utils/bindDispatch";
import _ from "lodash";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCollection: [],
      column: [],
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

  filteredData = () => {
    let { searchInput } = this.state;
    let { reducer } = this.props;
    let { userHistory } = reducer;
    let clonedArray = _.cloneDeep(userHistory);
    let filterData = [];
    clonedArray.map((value) => {
      if (!searchInput) {
        return filterData.push(value);
      }
      let record = Object.entries(value);
      let isLetter = false;
      function checkWord(record) {
        record.map((details) => {
          if (typeof details[1] === "object" && details[0] !== "dob") {
            if (!Array.isArray(details[1])) {
              let record = Object.entries(details[1]);
              checkWord(record);
              return (details[1] = Object.fromEntries(record));
            }
          }
          if (
            details[0] === "userName" ||
            details[0] === "email" ||
            details[0] === "mobileNumber" ||
            details[0] === "address" ||
            details[0] === "district" ||
            details[0] === "state" ||
            details[0] === "profession"
          ) {
            if (typeof details[1] !== "boolean") {
              let val = details[1];
              if (
                (val.toLowerCase().includes(searchInput.toLowerCase()) ||
                  val
                    .toString()
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()) ||
                  val
                    .toString()
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())) &&
                searchInput.length
              ) {
                let index = val
                  .toLowerCase()
                  .indexOf(searchInput.toLowerCase());
                let newText = [
                  val.substring(0, index),
                  <span className={styles.highlight}>
                    {val.substring(index, index + searchInput.length)}
                  </span>,
                  val.substring(index + searchInput.length),
                ];
                isLetter = true;
                details[1] = newText;
              }
            }
          }
        });
      }
      checkWord(record);
      if (isLetter) {
        value = Object.fromEntries(record);
        return filterData.push(value);
      }
    });
    this.setState(
      {
        userCollection: filterData,
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

  handleEdit = (row) => {
    const { actions, history, reducer } = this.props;
    const { userHistory } = reducer;
    let editInfo = [...userHistory];
    let userIndex;
    editInfo.map((user, indexValue) => {
      if (user.id === row.original.id) {
        userIndex = indexValue;
      }
    });
    actions.editData("reducer", editInfo[userIndex]);
    actions.assignData("isEdit", true);
    history.push("/Form");
  };

  handleDelete = async (row) => {
    const { userCollection } = this.state;
    const { actions, reducer } = this.props;
    const { userHistory } = reducer;
    let userInfo = [...userCollection];

    userInfo.splice(row.index, 1);
    let userIndex;
    userHistory.map((user, indexValue) => {
      if (user.id === row.original.id) {
        userIndex = indexValue;
      }
    });
    userHistory.splice(userIndex, 1);
    this.setState({ userCollection: userInfo }, () => {
      actions.assignData("userHistory", userHistory);
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
    this.setState({ column: ColumnData(columnDetails) });
  };

  componentDidMount() {
    const { reducer } = this.props;
    const { userHistory } = reducer;
    this.setState(
      {
        userCollection: userHistory,
      },
      () => {
        this.updateColumn();
      }
    );
  }

  render() {
    const { history, reducer } = this.props;
    const { userHistory } = reducer;
    const { userCollection } = this.state;
    return (
      <div>
        <div className={styles.title}>
          <h2>Individual List({userHistory.length})</h2>
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
            />
            <Button
              className={styles.addNew}
              onClick={() => history.push("/Form")}
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
            <h1>NO DATA FOUND</h1>
          </center>
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

/* eslint-disable array-callback-return */
import React, { Component } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import "react-table-v6/react-table.css";
import "../styles/Table.scss";
import * as styles from "../styles/TableStyles.module.scss";
import ReactTable from "react-table-v6";
import ColumnData from "./TableComponents/ColumnData";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import bindDispatch from "../utils/bindDispatch";
import * as apiReq from "../utils/api/GetAPI";
import { deleteAPI } from "../utils/api/deleteApi";
import _ from "lodash";
import { defaultState } from "../utils/productSeed";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCollection: [],
      column: [],
      noDataDisplay: "No Data Found",
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

  filteredData = async () => {
    let { searchInput } = this.state;
    let res = await apiReq.getAllUsers();
    let clonedArray = _.cloneDeep(res.data);
    let filterData = [];
    // eslint-disable-next-line array-callback-return
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
            details[0] === "name" ||
            details[0] === "mailId" ||
            details[0] === "mob" ||
            details[0] === "address" ||
            details[0] === "district" ||
            details[0] === "state" ||
            details[0] === "userRole"
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

  handleEdit = async (row) => {
    const { actions, history, reducer } = this.props;
    const { personalDetails } = reducer;
    let res = await apiReq.getUsersById(row.original.id);
    await actions.editData("reducer", defaultState);
    let editInfo = res.data;
    personalDetails.id = editInfo.id;
    personalDetails.mailId = editInfo.mailId;
    personalDetails.name = editInfo.name;
    personalDetails.age = editInfo.age;
    personalDetails.mobNo = editInfo.mobNo;
    personalDetails.genderId = editInfo.genderId;
    personalDetails.dateOfBirth = editInfo.dateOfBirth;
    personalDetails.motherTongueId = editInfo.motherTongueId;
    personalDetails.preferredLanguageId = editInfo.preferredLanguageId;
    personalDetails.knownViaProducts = editInfo.knownViaProducts;
    personalDetails.others = editInfo.others;
    await actions.assignData("personalDetails", personalDetails);
    await actions.assignData(
      "qualificationDetails",
      editInfo.qualificationDetails
    );
    await actions.assignData("addressDetails", editInfo.addressDetails);
    actions.assignData("isEdit", true);
    history.push("/Form");
  };

  handleDelete = async (row) => {
    const { userCollection } = this.state;
    let userInfo = [...userCollection];
    let res = await deleteAPI(row.original.id);
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
    this.setState({ column: ColumnData(columnDetails) });
  };

  async componentDidMount() {
    let res = await apiReq.getAllUsers();
    console.log(res.request.status);
    if (res.request.status === 201){

      this.setState(
        {
          userCollection: res.data,
          apiData: res.data,
        },
        () => {
          this.updateColumn();
        }
      );
    }else{
      this.setState({noDataDisplay:`Error:${res.request.status} Cannot Fetch Data`})
    }
  }

  render() {
    const { history } = this.props;
    const { userCollection } = this.state;
    return (
      <div>
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
            <h1>{this.state.noDataDisplay}</h1>
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

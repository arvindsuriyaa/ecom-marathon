import React from "react";
import * as styles from "../../styles/TableElements.module.scss";
import ToggleButton from "./ToggleButton";
import TableActions from "./TableActions";

function ColumnData(props) {
  const { toggleIcon, handleDelete, handleEdit } = props;
  
  return [
    {
      id: "userName",
      Header: () => {
        return (
          <div className={styles.headerTitle}>
            <span className={styles.centerAlign}>UserName</span>
            <ToggleButton toggleIcon={toggleIcon} name={"userNameSort"} />
          </div>
        );
      },
      accessor: (d) => d.personalDetails.userName,
      width: 160,
      show: true,
    },
    {
      id: "mailID",
      width: 220,
      Header: () => {
        return (
          <div className={styles.headerTitle}>
            <span className={styles.centerAlign}>Mail Id</span>
            <ToggleButton toggleIcon={toggleIcon} name={"mailIDSort"} />
          </div>
        );
      },
      accessor: (d) => d.personalDetails.email,
      show: true,
    },
    {
      id: "mobileNumber",
      width: 220,
      Header: () => {
        return (
          <div className={styles.headerTitle}>
            <span className={styles.centerAlign}>Mobile Number</span>
            <ToggleButton toggleIcon={toggleIcon} name={"mobileNumberSort"} />
          </div>
        );
      },
      accessor: (d) => d.personalDetails.mobileNumber,
      show: true,
    },
    {
      id: "address",
      Header: () => {
        return (
          <div className={styles.headerTitle}>
            <span className={styles.centerAlign}>Address</span>
            <ToggleButton toggleIcon={toggleIcon} name={"addressSort"} />
          </div>
        );
      },
      accessor: (d) => d.addressDetails.institutionAddress,
      show: true,
    },
    {
      id: "district",
      Header: () => {
        return (
          <div className={styles.headerTitle}>
            <span className={styles.centerAlign}>District</span>
            <ToggleButton toggleIcon={toggleIcon} name={"districtSort"} />
          </div>
        );
      },
      accessor: (d) => d.addressDetails.district,
      show: true,
    },
    {
      id: "state",
      Header: () => {
        return (
          <div className={styles.headerTitle}>
            <span className={styles.centerAlign}>State</span>
            <ToggleButton toggleIcon={toggleIcon} name={"stateSort"} />
          </div>
        );
      },
      accessor: (d) => d.addressDetails.state,
      width: 150,
      show: true,
    },
    {
      id: "profession",
      Header: () => {
        return (
          <div className={styles.headerTitle}>
            <span className={styles.centerAlign}>Profession</span>
            <ToggleButton toggleIcon={toggleIcon} name={"professionSort"} />
          </div>
        );
      },
      accessor: "profession",
      width: 170,
      show: true,
    },
    {
      accessor: "actions",
      width: 70,
      resizable: false,
      Cell: (row) => {
        return (
          <TableActions
            row={row}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        );
      },
      show: true,
    },
  ];
}

export default ColumnData;

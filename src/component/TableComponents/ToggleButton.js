import React from "react";
import * as styles from "../../styles/TableElements.module.scss";
import SortIcon from "@material-ui/icons/Sort";

const ToggleButton = (props) => {
  const { toggleIcon, name } = props;
  let sortName = name;
  return (
    <div>
      <button className={styles.sort}>
        <SortIcon />
        <span className={!toggleIcon[sortName] ? styles.arrowUp : styles.hide}>
          <i name={sortName} className="fas fa-sort-up"></i>
        </span>
        <span className={!toggleIcon[sortName] ? styles.hide : styles.show}>
          <i name={sortName} className="fas fa-sort-down"></i>
        </span>
      </button>
    </div>
  );
};

export default ToggleButton;

import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import "../../styles/Table.scss";

const TableActions = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { row, handleDelete, handleEdit } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
    return anchorEl;
  };

  const deleteAction = async (row) => {
    const anchor = await handleClose();
    if (anchor) handleDelete(row);
  };

  return (
    <div className="tableDeleteButton">
      <Button onClick={handleClick}>
        <MoreHorizIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleEdit(row)}>Edit</MenuItem>
        <MenuItem
          onClick={() => {
            deleteAction(row);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default TableActions;

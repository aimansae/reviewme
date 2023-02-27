import React from "react";

import styles from "../styles/DropDown.module.css";
import Dropdown from "react-bootstrap/Dropdown";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const EditMenu = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fa-solid fa-bars"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const DropDown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={EditMenu} />

      <Dropdown.Menu
        className={styles.Show}
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <i className={`${styles.IconColor} fa-solid fa-pen-to-square`} />
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          <i className={`${styles.IconColorRed} fa-solid fa-trash`} />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

 import React from "react";

import styles from "../styles/DropDown.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router";


// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const EditMenu = React.forwardRef(({ onClick }, ref) => (
  <i
    className={` ${styles.IconBar} fa-solid fa-bars `}
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

export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={EditMenu } />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className={`${styles.IconColor} fas fa-edit`} /> edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className={`${styles.IconIdCard} far fa-id-card `}/>
          change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className={`${styles.IconKey} fas fa-key`} />
          change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

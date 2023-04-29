import React from 'react';
import PropTypes from 'prop-types';
import styles from './contactListItem.module.css';

const ContactListItem = ({ contact, onDeleteContact }) => (
  <li className={styles['item']}>
    <button
      className={styles['delete-button']}
      type="button"
      onClick={() => onDeleteContact(contact.id)}
    >
      ❌
    </button>
    <p>
      {contact.name}: {contact.phone}
    </p>
  </li>
);

export default ContactListItem;

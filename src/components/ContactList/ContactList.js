import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactListItem from '../ContactListItem/ContactListItem';
import styles from './contactList.module.css';
import { fetchContacts } from '../../redux/contactSlice';

function ContactList({ onDeleteContact }) {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  React.useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul className={styles.list}>
      {contacts.map(contact => (
        <ContactListItem key={contact.id} contact={contact} onDeleteContact={onDeleteContact} />
      ))}
    </ul>
  );
}

export default ContactList;

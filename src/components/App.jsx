import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from './app.module.css';
import { addContact, deleteContact, setFilter, initializeContacts } from '../redux/contactSlice';
// import axios from 'axios';

function App() {
  const filter = useSelector(state => state.contacts.filter);
  const items = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeContacts());
  }, [dispatch]);

  const handleAddContact = async (name, number) => {
    const existingContact = items.find(contact => contact.phone === number);
    if (existingContact) {
      alert(`${number} is already in the phonebook for ${existingContact.name}.`);
      return;
    }

    const id = nanoid();
    dispatch(addContact({ id, name, phone: number }));

    const response = await fetch('https://644bb9ef4bdbc0cc3a98d0ff.mockapi.io/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name, phone: number }),
    });

    const data = await response.json();
    console.log(data);
  };

  const handleDeleteContact = async contactId => {
    const responsePromise = fetch(
      `https://644bb9ef4bdbc0cc3a98d0ff.mockapi.io/contacts/${contactId}`,
      {
        method: 'DELETE',
      }
    );
    try {
      await Promise.all([responsePromise]);
      dispatch(deleteContact(contactId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = e => {
    const { value } = e.target;
    dispatch(setFilter(value));
  };

  const filteredContacts = items.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleAddContact} />
      </div>

      <div className={styles.contacts}>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleFilterChange} />
        <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
      </div>
    </div>
  );
}

export default App;

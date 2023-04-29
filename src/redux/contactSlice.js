//contactSlice.js
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const addContact = createAction('contacts/addContact');
export const deleteContact = createAction('contacts/deleteContact');
export const setFilter = createAction('contacts/setFilter');
export const initializeContacts = createAction('contacts/initializeContacts');

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await fetch('https://644bb9ef4bdbc0cc3a98d0ff.mockapi.io/contacts');
  const data = await response.json();
  return data;
});

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
  },
  reducers: {},
  extraReducers: {
    [addContact]: (state, action) => {
      state.items.push(action.payload);
    },
    [deleteContact]: (state, action) => {
      state.items = state.items.filter(contact => contact.id !== action.payload);
    },
    [setFilter]: (state, action) => {
      state.filter = action.payload;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
  },
});

export default contactSlice.reducer;

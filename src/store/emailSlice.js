import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  emails: [],
  total: 15,
  selectedEmail: null,
};

export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmails: (state, action) => {
      state.emails.push(...action.payload);
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setSelectedEmail: (state, action) => {
      state.selectedEmail = action.payload;
    },
    updateEmailBody: (state, action) => {
      const { index, body } = action.payload;
      state.emails[index].body = body;
    },
    toggleFavourite: (state, action) => {
      const id = action.payload;
      const emailIndex = state.emails.findIndex((email) => email.id === id);
      state.emails[emailIndex].favourite = !state.emails[emailIndex].favourite;
    },
    updateRead: (state, action) => {
      const id = action.payload;
      const emailIndex = state.emails.findIndex((email) => email.id === id);
      state.emails[emailIndex].read = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setEmails,
  setTotal,
  setSelectedEmail,
  updateEmailBody,
  toggleFavourite,
  updateRead,
} = emailSlice.actions;

export default emailSlice.reducer;

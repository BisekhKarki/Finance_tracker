// store/index.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create a slice of state with actions
const counterSlice = createSlice({
  name: "counter",
  initialState: {},
  reducers: {},
});

export const { increment, decrement } = counterSlice.actions;

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
  extraReducer: (builder) => {},
});

export default store;

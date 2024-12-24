import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface transactionProps {
  type: string;
  userId: string;
  Amount: string;
  Category: string;
  Description: string;
  Date: string;
}

export const addTransaction = createAsyncThunk(
  "addTransaction",
  async (data: transactionProps, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/finance/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return response;
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Create a slice of state with actions
const transaction = createSlice({
  name: "counter",
  initialState: {
    transactions: [],
    loading: false,
    error: null,
    response: null,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(addTransaction.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(addTransaction.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.error = null;
        state.response = action.payload;
      })
      .addCase(addTransaction.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transaction.reducer;

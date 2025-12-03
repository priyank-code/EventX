import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  myTickets: [],
  loading: false,
  error: null,
};

export const fetchMyTickets = createAsyncThunk(
  "tickets/fetchMyTickets",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/tickets/my");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyTickets.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMyTickets.fulfilled, (state, action) => { state.loading = false; state.myTickets = action.payload; })
      .addCase(fetchMyTickets.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default ticketsSlice.reducer;

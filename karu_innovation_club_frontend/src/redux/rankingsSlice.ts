import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRankings = createAsyncThunk('rankings/fetchRankings', async () => {
  const response = await axios.get('/api/rankings/');
  return response.data;
});

const rankingsSlice = createSlice({
  name: 'rankings',
  initialState: {
    rankings: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRankings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRankings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rankings = action.payload;
      })
      .addCase(fetchRankings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default rankingsSlice.reducer;

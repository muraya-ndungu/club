import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Hackathon {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface HackathonsState {
  hackathons: Hackathon[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: HackathonsState = {
  hackathons: [],
  status: 'idle',
  error: null,
};

export const fetchHackathons = createAsyncThunk('hackathons/fetchHackathons', async () => {
  const response = await axios.get('/api/hackathons');
  return response.data;
});

const hackathonsSlice = createSlice({
  name: 'hackathons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHackathons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHackathons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hackathons = action.payload;
      })
      .addCase(fetchHackathons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch hackathons';
      });
  },
});

export default hackathonsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Mentorship {
  id: number;
  mentorName: string;
  menteeName: string;
}

interface MentorshipsState {
  mentorships: Mentorship[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MentorshipsState = {
  mentorships: [],
  status: 'idle',
  error: null,
};

export const fetchMentorships = createAsyncThunk('mentorships/fetchMentorships', async () => {
  const response = await axios.get('/api/mentorships');
  return response.data;
});

const mentorshipsSlice = createSlice({
  name: 'mentorships',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentorships.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMentorships.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.mentorships = action.payload;
      })
      .addCase(fetchMentorships.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch mentorships';
      });
  },
});

export default mentorshipsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  applyLink: string;
}

interface JobBoardState {
  jobs: Job[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: JobBoardState = {
  jobs: [],
  status: 'idle',
  error: null,
};

export const fetchJobBoard = createAsyncThunk('jobBoard/fetchJobBoard', async () => {
  const response = await axios.get('/api/jobs');
  return response.data;
});

const jobBoardSlice = createSlice({
  name: 'jobBoard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobBoard.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobBoard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
      })
      .addCase(fetchJobBoard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch job board';
      });
  },
});

export default jobBoardSlice.reducer;

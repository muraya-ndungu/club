import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Workshop {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface WorkshopsState {
  workshops: Workshop[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WorkshopsState = {
  workshops: [],
  status: 'idle',
  error: null,
};

export const fetchWorkshops = createAsyncThunk('workshops/fetchWorkshops', async () => {
  const response = await axios.get('/api/workshops');
  return response.data;
});

const workshopsSlice = createSlice({
  name: 'workshops',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkshops.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWorkshops.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.workshops = action.payload;
      })
      .addCase(fetchWorkshops.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch workshops';
      });
  },
});

export default workshopsSlice.reducer;

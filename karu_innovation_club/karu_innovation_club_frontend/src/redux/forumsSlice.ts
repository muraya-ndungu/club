import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Forum {
  id: number;
  title: string;
  description: string;
}

interface ForumsState {
  forums: Forum[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ForumsState = {
  forums: [],
  status: 'idle',
  error: null,
};

export const fetchForums = createAsyncThunk('forums/fetchForums', async () => {
  const response = await axios.get('/api/forums');
  return response.data;
});

const forumsSlice = createSlice({
  name: 'forums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForums.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchForums.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forums = action.payload;
      })
      .addCase(fetchForums.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch forums';
      });
  },
});

export default forumsSlice.reducer;

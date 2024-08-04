import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
}

interface ResourcesState {
  resources: Resource[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ResourcesState = {
  resources: [],
  status: 'idle',
  error: null,
};

export const fetchResources = createAsyncThunk('resources/fetchResources', async () => {
  const response = await axios.get('/api/resources');
  return response.data;
});

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResources.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.resources = action.payload;
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch resources';
      });
  },
});

export default resourcesSlice.reducer;

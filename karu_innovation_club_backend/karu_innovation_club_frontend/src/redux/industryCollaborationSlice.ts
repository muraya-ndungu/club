import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Collaboration {
  id: number;
  companyName: string;
  projectTitle: string;
  description: string;
}

interface IndustryCollaborationState {
  collaborations: Collaboration[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IndustryCollaborationState = {
  collaborations: [],
  status: 'idle',
  error: null,
};

export const fetchIndustryCollaborations = createAsyncThunk('industryCollaborations/fetchIndustryCollaborations', async () => {
  const response = await axios.get('/api/collaborations');
  return response.data;
});

const industryCollaborationSlice = createSlice({
  name: 'industryCollaboration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndustryCollaborations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIndustryCollaborations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.collaborations = action.payload;
      })
      .addCase(fetchIndustryCollaborations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch industry collaborations';
      });
  },
});

export default industryCollaborationSlice.reducer;

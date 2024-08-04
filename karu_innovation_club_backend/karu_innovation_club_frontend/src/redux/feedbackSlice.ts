import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface FeedbackState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FeedbackState = {
  status: 'idle',
  error: null,
};

export const submitFeedback = createAsyncThunk('feedback/submitFeedback', async (feedback: string) => {
  const response = await axios.post('/api/feedback', { feedback });
  return response.data;
});

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitFeedback.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitFeedback.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to submit feedback';
      });
  },
});

export default feedbackSlice.reducer;

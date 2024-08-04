import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface NewsletterState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NewsletterState = {
  status: 'idle',
  error: null,
};

export const subscribeNewsletter = createAsyncThunk('newsletter/subscribeNewsletter', async (email: string) => {
  const response = await axios.post('/api/newsletter/subscribe', { email });
  return response.data;
});

const newsletterSlice = createSlice({
  name: 'newsletter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(subscribeNewsletter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(subscribeNewsletter.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(subscribeNewsletter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to subscribe to newsletter';
      });
  },
});

export default newsletterSlice.reducer;

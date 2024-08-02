import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

interface EventsState {
  events: Event[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  status: 'idle',
  error: null,
};

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await fetch('/api/events'); // Replace with your actual API endpoint
  const data = await response.json();
  return data;
});

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch events';
      });
  },
});

export default eventsSlice.reducer;

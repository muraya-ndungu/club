import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Badge {
  id: number;
  name: string;
  description: string;
}

interface AchievementBadgesState {
  badges: Badge[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AchievementBadgesState = {
  badges: [],
  status: 'idle',
  error: null,
};

export const fetchAchievementBadges = createAsyncThunk('achievementBadges/fetchAchievementBadges', async () => {
  const response = await axios.get('/api/badges');
  return response.data;
});

const achievementBadgesSlice = createSlice({
  name: 'achievementBadges',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAchievementBadges.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAchievementBadges.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.badges = action.payload;
      })
      .addCase(fetchAchievementBadges.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch achievement badges';
      });
  },
});

export default achievementBadgesSlice.reducer;

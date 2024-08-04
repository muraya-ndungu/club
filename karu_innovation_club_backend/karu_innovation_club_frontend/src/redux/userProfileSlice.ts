import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Project {
  id: number;
  title: string;
}

interface UserProfile {
  name: string;
  skills: string[];
  projects: Project[];
  contributions: number;
}

interface UserProfileState {
  profile: UserProfile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserProfileState = {
  profile: null,
  status: 'idle',
  error: null,
};

export const fetchUserProfile = createAsyncThunk('userProfile/fetchUserProfile', async () => {
  const response = await axios.get('/api/user/profile');
  return response.data;
});

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user profile';
      });
  },
});

export default userProfileSlice.reducer;

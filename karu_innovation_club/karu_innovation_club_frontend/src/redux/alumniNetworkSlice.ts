import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Alumni {
  id: number;
  name: string;
  occupation: string;
}

interface AlumniNetworkState {
  alumni: Alumni[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AlumniNetworkState = {
  alumni: [],
  status: 'idle',
  error: null,
};

export const fetchAlumniNetwork = createAsyncThunk('alumniNetwork/fetchAlumniNetwork', async () => {
  const response = await axios.get('/api/alumni');
  return response.data;
});

const alumniNetworkSlice = createSlice({
  name: 'alumniNetwork',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlumniNetwork.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAlumniNetwork.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.alumni = action.payload;
      })
      .addCase(fetchAlumniNetwork.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch alumni network';
      });
  },
});

export default alumniNetworkSlice.reducer;

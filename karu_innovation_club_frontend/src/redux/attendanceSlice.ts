import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AttendanceRecord } from '../types/attendance';

// Define the async thunk with proper typing
export const fetchAttendance = createAsyncThunk<AttendanceRecord[]>(
  'attendance/fetchAttendance',
  async (): Promise<AttendanceRecord[]> => {
    const response = await axios.get<AttendanceRecord[]>('/api/attendance/');
    return response.data;
  }
);

interface AttendanceState {
  attendance: AttendanceRecord[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AttendanceState = {
  attendance: [],
  status: 'idle',
  error: null,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendance.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.attendance = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null; // Handle undefined case
      });
  },
});

export default attendanceSlice.reducer;


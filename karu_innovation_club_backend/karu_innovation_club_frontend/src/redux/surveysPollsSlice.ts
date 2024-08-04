import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Survey {
  id: number;
  question: string;
  responses: string[];
}

interface SurveysPollsState {
  surveys: Survey[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SurveysPollsState = {
  surveys: [],
  status: 'idle',
  error: null,
};

export const fetchSurveysPolls = createAsyncThunk('surveysPolls/fetchSurveysPolls', async () => {
  const response = await axios.get('/api/surveys');
  return response.data;
});

export const submitSurveyResponse = createAsyncThunk('surveysPolls/submitSurveyResponse', async (response: string) => {
  const result = await axios.post('/api/surveys/response', { response });
  return result.data;
});

const surveysPollsSlice = createSlice({
  name: 'surveysPolls',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurveysPolls.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSurveysPolls.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.surveys = action.payload;
      })
      .addCase(fetchSurveysPolls.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch surveys and polls';
      })
      .addCase(submitSurveyResponse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitSurveyResponse.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(submitSurveyResponse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to submit survey response';
      });
  },
});

export default surveysPollsSlice.reducer;

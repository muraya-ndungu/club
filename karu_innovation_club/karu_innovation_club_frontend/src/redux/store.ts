import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './eventsSlice';
import notificationsReducer from './notificationsSlice';
import paymentsReducer from './paymentsSlice';
import rankingsReducer from './rankingsSlice';
import attendanceReducer from './attendanceSlice';

const store = configureStore({
  reducer: {
    events: eventsReducer,
    notifications: notificationsReducer,
    payments: paymentsReducer,
    rankings: rankingsReducer,
    attendance: attendanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

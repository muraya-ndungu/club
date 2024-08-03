import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchAttendance } from '../redux/attendanceSlice';
import { AttendanceRecord } from '../Types/attendance';

const Attendance: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const attendance = useSelector((state: RootState) => state.attendance.attendance) as AttendanceRecord[];
  const attendanceStatus = useSelector((state: RootState) => state.attendance.status);
  const error = useSelector((state: RootState) => state.attendance.error);

  useEffect(() => {
    if (attendanceStatus === 'idle') {
      dispatch(fetchAttendance());
    }
  }, [attendanceStatus, dispatch]);

  let content;

  if (attendanceStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (attendanceStatus === 'succeeded') {
    content = attendance.map((record) => (
      <div key={record.id}>
        <p>Member: {record.memberName}</p>
        <p>Date: {record.date}</p>
        <p>Status: {record.status}</p>
      </div>
    ));
  } else if (attendanceStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h2>Attendance</h2>
      {content}
    </div>
  );
};

export default Attendance;


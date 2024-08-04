import React, { useState, useEffect } from 'react';

const Attendance: React.FC = () => {
  const [attendances, setAttendances] = useState<any[]>([]);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchAttendances = async () => {
      const response = await fetch('http://localhost:8000/api/attendance/');
      const data = await response.json();
      setAttendances(data);
    };
    fetchAttendances();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/attendance/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      },
      body: JSON.stringify({ date, status }),
    });
    if (response.ok) {
      const newAttendance = await response.json();
      setAttendances([...attendances, newAttendance]);
      setDate('');
      setStatus('');
      console.log('Attendance recorded successfully');
    } else {
      console.log('Failed to record attendance');
    }
  };

  return (
    <div className="attendance">
      <h2 className="text-2xl font-semibold mb-4">Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Record Attendance
        </button>
      </form>
      <h3 className="text-xl font-semibold mt-4">Attendance List</h3>
      <ul>
        {attendances.map(attendance => (
          <li key={attendance.id} className="border rounded p-2 mb-2">
            <p>{attendance.date} - {attendance.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attendance;

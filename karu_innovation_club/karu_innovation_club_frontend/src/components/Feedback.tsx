import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitFeedback } from '../redux/feedbackSlice';

const Feedback: React.FC = () => {
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    dispatch(submitFeedback(feedback));
    setFeedback('');
  };

  return (
    <div>
      <h1>Feedback System</h1>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows={5}
        cols={50}
      />
      <button onClick={handleSubmit}>Submit Feedback</button>
    </div>
  );
};

export default Feedback;

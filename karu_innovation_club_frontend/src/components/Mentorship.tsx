import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchMentorships } from '../redux/mentorshipsSlice';

const Mentorship: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mentorships = useSelector((state: RootState) => state.mentorships.mentorships);
  const mentorshipStatus = useSelector((state: RootState) => state.mentorships.status);
  const error = useSelector((state: RootState) => state.mentorships.error);

  useEffect(() => {
    if (mentorshipStatus === 'idle') {
      dispatch(fetchMentorships());
    }
  }, [mentorshipStatus, dispatch]);

  let content;

  if (mentorshipStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (mentorshipStatus === 'succeeded') {
    content = mentorships.map((mentorship) => (
      <div key={mentorship.id}>
        <h3>Mentor: {mentorship.mentorName}</h3>
        <p>Mentee: {mentorship.menteeName}</p>
      </div>
    ));
  } else if (mentorshipStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h1>Mentorship Programs</h1>
      {content}
    </div>
  );
};

export default Mentorship;

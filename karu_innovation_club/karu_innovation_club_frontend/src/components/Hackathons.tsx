import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchHackathons } from '../redux/hackathonsSlice';

const Hackathons: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hackathons = useSelector((state: RootState) => state.hackathons.hackathons);
  const hackathonsStatus = useSelector((state: RootState) => state.hackathons.status);
  const error = useSelector((state: RootState) => state.hackathons.error);

  useEffect(() => {
    if (hackathonsStatus === 'idle') {
      dispatch(fetchHackathons());
    }
  }, [hackathonsStatus, dispatch]);

  let content;

  if (hackathonsStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (hackathonsStatus === 'succeeded') {
    content = hackathons.map((hackathon) => (
      <div key={hackathon.id}>
        <h3>{hackathon.title}</h3>
        <p>{hackathon.description}</p>
        <p>Date: {hackathon.date}</p>
      </div>
    ));
  } else if (hackathonsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h1>Hackathons and Competitions</h1>
      {content}
    </div>
  );
};

export default Hackathons;

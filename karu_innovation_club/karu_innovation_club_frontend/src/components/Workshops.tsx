import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchWorkshops } from '../redux/workshopsSlice';

const Workshops: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const workshops = useSelector((state: RootState) => state.workshops.workshops);
  const workshopsStatus = useSelector((state: RootState) => state.workshops.status);
  const error = useSelector((state: RootState) => state.workshops.error);

  useEffect(() => {
    if (workshopsStatus === 'idle') {
      dispatch(fetchWorkshops());
    }
  }, [workshopsStatus, dispatch]);

  let content;

  if (workshopsStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (workshopsStatus === 'succeeded') {
    content = workshops.map((workshop) => (
      <div key={workshop.id}>
        <h3>{workshop.title}</h3>
        <p>{workshop.description}</p>
        <p>Date: {workshop.date}</p>
      </div>
    ));
  } else if (workshopsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h1>Workshops and Tutorials</h1>
      {content}
    </div>
  );
};

export default Workshops;

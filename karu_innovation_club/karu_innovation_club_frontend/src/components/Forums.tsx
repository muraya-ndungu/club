import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchForums } from '../redux/forumsSlice';

const Forums: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const forums = useSelector((state: RootState) => state.forums.forums);
  const forumsStatus = useSelector((state: RootState) => state.forums.status);
  const error = useSelector((state: RootState) => state.forums.error);

  useEffect(() => {
    if (forumsStatus === 'idle') {
      dispatch(fetchForums());
    }
  }, [forumsStatus, dispatch]);

  let content;

  if (forumsStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (forumsStatus === 'succeeded') {
    content = forums.map((forum) => (
      <div key={forum.id}>
        <h3>{forum.title}</h3>
        <p>{forum.description}</p>
      </div>
    ));
  } else if (forumsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h1>Forums</h1>
      {content}
    </div>
  );
};

export default Forums;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchResources } from '../redux/resourcesSlice';

const ResourceLibrary: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const resources = useSelector((state: RootState) => state.resources.resources);
  const resourcesStatus = useSelector((state: RootState) => state.resources.status);
  const error = useSelector((state: RootState) => state.resources.error);

  useEffect(() => {
    if (resourcesStatus === 'idle') {
      dispatch(fetchResources());
    }
  }, [resourcesStatus, dispatch]);

  let content;

  if (resourcesStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (resourcesStatus === 'succeeded') {
    content = resources.map((resource) => (
      <div key={resource.id}>
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
        <a href={resource.url} target="_blank" rel="noopener noreferrer">Access Resource</a>
      </div>
    ));
  } else if (resourcesStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h1>Resource Library</h1>
      {content}
    </div>
  );
};

export default ResourceLibrary;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchUserProfile } from '../redux/userProfileSlice';

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.userProfile.profile);
  const profileStatus = useSelector((state: RootState) => state.userProfile.status);
  const error = useSelector((state: RootState) => state.userProfile.error);

  useEffect(() => {
    if (profileStatus === 'idle') {
      dispatch(fetchUserProfile());
    }
  }, [profileStatus, dispatch]);

  let content;

  if (profileStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (profileStatus === 'succeeded') {
    content = (
      <div>
        <h2>{profile.name}</h2>
        <p>Skills: {profile.skills.join(', ')}</p>
        <h3>Projects</h3>
        <ul>
          {profile.projects.map((project) => (
            <li key={project.id}>{project.title}</li>
          ))}
        </ul>
        <h3>Contributions</h3>
        <p>{profile.contributions}</p>
      </div>
    );
  } else if (profileStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      {content}
    </div>
  );
};

export default UserProfile;

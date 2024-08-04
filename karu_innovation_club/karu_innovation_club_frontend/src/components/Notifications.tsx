import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchNotifications } from '../redux/notificationsSlice';

const Notifications: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useSelector((state: RootState) => state.notifications.notifications);
  const notificationStatus = useSelector((state: RootState) => state.notifications.status);
  const error = useSelector((state: RootState) => state.notifications.error);

  useEffect(() => {
    if (notificationStatus === 'idle') {
      dispatch(fetchNotifications());
    }
  }, [notificationStatus, dispatch]);

  let content;

  if (notificationStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (notificationStatus === 'succeeded') {
    content = notifications.map((notification) => (
      <div key={notification.id}>
        <p>{notification.message}</p>
        <p>{notification.created_at}</p>
      </div>
    ));
  } else if (notificationStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h2>Notifications</h2>
      {content}
    </div>
  );
};

export default Notifications;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchEvents } from '../redux/eventsSlice';

const Events: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state.events.events);
  const eventStatus = useSelector((state: RootState) => state.events.status);
  const error = useSelector((state: RootState) => state.events.error);

  useEffect(() => {
    if (eventStatus === 'idle') {
      dispatch(fetchEvents());
    }
  }, [eventStatus, dispatch]);

  let content;

  if (eventStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (eventStatus === 'succeeded') {
    content = events.map((event) => (
      <div key={event.id} className="event bg-white p-4 shadow-md rounded mb-4">
        <h3 className="text-xl font-bold">{event.title}</h3>
        <p>{event.description}</p>
        <p className="text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
        <p className="text-gray-500">{event.location}</p>
      </div>
    ));
  } else if (eventStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div className="events text-center p-4">
      <h2 className="text-4xl font-bold mb-4">Events</h2>
      {content}
    </div>
  );
};

export default Events;
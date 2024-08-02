import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="home text-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Karatina University Innovation Club</h1>
      <p className="text-lg mb-4">Discover our latest events, projects, and innovations.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-2xl font-semibold mb-2">Upcoming Event</h2>
          <p>Join us for our next exciting event on innovation in technology.</p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-2xl font-semibold mb-2">Featured Project</h2>
          <p>Check out our latest project that is revolutionizing the way we think about sustainability.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

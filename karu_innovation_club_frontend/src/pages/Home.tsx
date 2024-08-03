import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="home text-center relative overflow-hidden">
      <div className="hero flex items-center justify-center text-white relative">
        <div className="z-10 p-4">
          <h1 className="text-5xl font-bold mb-4">Welcome to the Karatina University Innovation Club</h1>
          <p className="text-lg mb-8">Discover our latest events, projects, and innovations.</p>
        </div>
        <div className="absolute inset-0 bg-hero-pattern z-0"></div>
      </div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-gray-100 rounded shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Event</h2>
            <img src="/src/assets/images/upcoming_event.jpg" alt="Upcoming Event" className="w-full h-48 object-cover rounded mb-4" />
            <p>Join us for our next exciting event on innovation in technology. Engage with experts and learn about the latest trends.</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Learn More</button>
          </div>
          <div className="p-6 bg-gray-100 rounded shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Featured Project</h2>
            <img src="/src/assets/images/featured_project.jpg" alt="Featured Project" className="w-full h-48 object-cover rounded mb-4" />
            <p>Check out our latest project that is revolutionizing the way we think about sustainability. See how our team is making a difference.</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Read More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
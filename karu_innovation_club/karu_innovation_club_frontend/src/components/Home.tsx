import React, { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [activeMembers, setActiveMembers] = useState(400); // Example active members count
  const [projectCount, setProjectCount] = useState(20); // Example project count
  const [eventTime, setEventTime] = useState(new Date("2024-08-31T23:59:59").getTime());
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventTime - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [eventTime]);

  return (
    <div className="home text-center relative overflow-hidden">
      <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
        Active Members: {activeMembers}
      </div>
      <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
        Projects: {projectCount}
      </div>
      <div className="hero flex items-center justify-center text-white relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/src/assets/images/hero_background.svg)' }}>
        <div className="z-10 p-4 bg-black bg-opacity-50 rounded-lg">
          <h1 className="text-5xl font-bold mb-4">Welcome to the Karatina University Innovation Club</h1>
          <p className="text-lg mb-8">Discover our latest events, projects, and innovations.</p>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Event</h2>
            <img src="/src/assets/images/upcoming_event.jpg" alt="Upcoming Event" className="w-full h-48 object-cover rounded mb-4" />
            <p className="text-gray-700">Join us for our next exciting event on innovation in technology. Engage with experts and learn about the latest trends.</p>
            <div className="mt-4 text-center">
              <div className="text-gray-500">Countdown to Event:</div>
              <div className="text-2xl font-bold">
                {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
              </div>
            </div>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">View More</button>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Featured Project</h2>
            <img src="/src/assets/images/featured_project.jpg" alt="Featured Project" className="w-full h-48 object-cover rounded mb-4" />
            <p className="text-gray-700">Check out our latest project that is revolutionizing the way we think about sustainability. See how our team is making a difference.</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Read More</button>
          </div>
        </div>
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Message from the Patron and Chairman</h2>
          <p className="mb-4 text-gray-700">Welcome to the Karatina University Innovation Club. We are committed to fostering innovation and creativity among our members. Join us in our journey to make a positive impact through technology and innovation.</p>
          <div className="flex justify-between items-center">
            <div className="text-left">
              <p><strong>Patron:</strong> Dr. vancy kebut</p>
              <p><strong>Chairman:</strong>mr. victor</p>
            </div>
            <div className="flex">
              <img src="/src/assets/images/blb.jpg" alt="Patron" className="w-20 h-20 object-cover rounded-full mr-4" />
              <img src="/src/assets/images/chairman.jpg" alt="Chairman" className="w-20 h-20 object-cover rounded-full" />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-between items-center overflow-hidden relative">
          <div className="leader-marquee whitespace-nowrap flex space-x-4 animate-marquee">
            <img src="/src/assets/images/leader1.jpg" alt="Leader 1" className="inline-block w-20 h-20 object-cover rounded-full" />
            <img src="/src/assets/images/leader2.jpg" alt="Leader 2" className="inline-block w-20 h-20 object-cover rounded-full" />
            {/* Add more leader images as needed */}
          </div>
          <div className="community-marquee whitespace-nowrap flex space-x-4 animate-marquee-reverse">
            <img src="/src/assets/images/community1.jpg" alt="Community 1" className="inline-block w-20 h-20 object-cover rounded-full" />
            <img src="/src/assets/images/community2.jpg" alt="Community 2" className="inline-block w-20 h-20 object-cover rounded-full" />
            {/* Add more community images as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

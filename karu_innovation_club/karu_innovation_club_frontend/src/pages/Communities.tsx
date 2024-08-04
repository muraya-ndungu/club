import React from 'react';

const communities = [
  {
    name: 'Android Development',
    description: 'Learn and build Android apps with the latest technologies.',
    image: 'src/assets/images/android.jpg',
  },
  {
    name: 'IoT',
    description: 'Explore the world of Internet of Things and build smart devices.',
    image: 'src/assets/images/iot.jpg',
  },
  {
    name: 'Cybersecurity',
    description: 'Understand and implement cybersecurity practices to protect systems.',
    image: 'src/assets/images/cybersecurity.jpg',
  },
  {
    name: 'Web Development',
    description: 'Create modern web applications using the latest web technologies.',
    image: 'src/assets/images/webdev.jpg',
  },
  {
    name: 'Machine Learning / Data Science / AI',
    description: 'Dive into the world of AI and learn how to work with data.',
    image: 'src/assets/images/blb.jpg',
  },
];

const Communities: React.FC = () => {
  return (
    <div className="communities page p-4">
      <h1 className="page-header text-4xl font-bold mb-4">Communities</h1>
      <p className="page-content text-lg mb-4">
        The Karatina University Innovation Club has several active communities. Each community focuses on a specific area of technology and innovation, offering members the opportunity to learn, collaborate, and build projects.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {communities.map((community, index) => (
          <div key={index} className="card bg-white p-6 rounded-lg shadow-md">
            <img src={community.image} alt={community.name} className="rounded-t-lg w-full h-48 object-cover mb-4" />
            <h2 className="text-2xl font-bold mb-2">{community.name}</h2>
            <p className="text-lg">{community.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Communities;

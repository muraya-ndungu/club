import React, { useState, useEffect } from 'react';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('http://localhost:8000/api/projects/');
      const data = await response.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/projects/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      },
      body: JSON.stringify({ title, description }),
    });
    if (response.ok) {
      const newProject = await response.json();
      setProjects([...projects, newProject]);
      setTitle('');
      setDescription('');
      console.log('Project created successfully');
    } else {
      console.log('Failed to create project');
    }
  };

  return (
    <div className="projects">
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Project
        </button>
      </form>
      <h3 className="text-xl font-semibold mt-4">Project List</h3>
      <ul>
        {projects.map(project => (
          <li key={project.id} className="border rounded p-2 mb-2">
            <h4 className="font-bold">{project.title}</h4>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;

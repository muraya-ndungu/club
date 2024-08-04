import React, { useState, useEffect } from 'react';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('http://localhost:8000/api/profile/1/'); // Adjust the URL and user ID as needed
      const data = await response.json();
      setProfile(data);
      setBio(data.bio);
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bio', bio);
    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }
    const response = await fetch('http://localhost:8000/api/profile/1/', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      },
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      setProfile(data);
      console.log('Profile updated successfully');
    } else {
      console.log('Failed to update profile');
    }
  };

  return (
    <div className="profile">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      {profile && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Profile Picture</label>
            <input
              type="file"
              onChange={(e) => setProfilePicture(e.target.files ? e.target.files[0] : null)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;

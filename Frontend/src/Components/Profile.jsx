import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const apiUrl = import.meta.env.VITE_Backend_URL || "http://localhost:5000";
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Fetch recent data when component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('Auth-token')
        },
      });
      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };
  
  return (
    <div className="container mx-auto mt-8 max-w-xl bg-gray-100 rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">User Profile</h1>
      <div className="flex flex-col items-center mb-8">
        {/* Display current profile picture */}
        <img src={userData.profile || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="Profile" className="w-32 h-32 rounded-full mb-4 shadow-md" />
        <p className="mb-4"><span className="font-semibold">Email:</span> {userData.email}</p>
        <p className="mb-2"><span className="font-semibold">Role:</span> {userData.role}</p>
      </div>
    </div>
  );
};

export default UserProfile;

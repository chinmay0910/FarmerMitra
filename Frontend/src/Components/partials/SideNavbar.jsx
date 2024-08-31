import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SideNavbar = () => {
  const [userData, setUserData] = useState(null); // Initialize as null to handle loading state
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_Backend_URL || "http://localhost:5000"; // Define apiUrl

  const handleLogout = () => {
    localStorage.removeItem('Auth-token');
    navigate('/signin');
  };

  useEffect(() => {
    const authToken = localStorage.getItem('Auth-token');
    if (!authToken) {
      navigate('/signin');
    } else {
      fetchUserData();
    }
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('Auth-token'),
        },
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null); // Handle error by resetting user data
    } finally {
      setLoading(false);
    }
  };

  // Show a loading state or handle absence of user data
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error loading user data</div>;
  }

  return (
    <Card className="h-screen w-full p-4 shadow-xl shadow-blue-gray-600/2">
      <div className="mb-2 p-4 text-black text-3xl font-bold">
        LOGO
      </div>
      <List>
        {/* Show specific links for buyer */}
        {userData.role === 'buyer' && (
          <>
            <Link to='/createAgreement'>
              <ListItem>
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                Create Agreement
              </ListItem>
            </Link>
            <Link to="/contract/registerations">
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Registrations
              </ListItem>
            </Link>
          </>
        )}

        {/* Common links for all users */}
        <Link to='/'>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>

        <Link to='/agreement'>
          <ListItem>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Contracts
          </ListItem>
        </Link>

        <Link to="/profile">
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
        </Link>

        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>

        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default SideNavbar;

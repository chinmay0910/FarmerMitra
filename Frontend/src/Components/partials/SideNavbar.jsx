import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";


const SideNavbar = () => {

  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem('Auth-token');
    navigate('/signin');
  }

  // useEffect(() => {
  //   const authToken = localStorage.getItem('Auth-token');
  //   if (!authToken) {
  //     navigate('/signin');
  //   }
  // }, [navigate]);
  return (
    <Card className="h-screen w-full p-4 shadow-xl shadow-blue-gray-600/2">
      <div className="mb-2 p-4 text-black text-3xl font-bold">
        LOGO
      </div>
      <List>
        <Link to='/'>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Link to='/agreements'>
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
        <ListItem onClick={handlelogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}

export default SideNavbar;
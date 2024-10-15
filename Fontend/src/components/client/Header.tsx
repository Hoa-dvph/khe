import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { FaCaretDown } from "react-icons/fa";
import VectorLogo from "../../assets/images/Vector.svg";
import VectorNotifications from "../../assets/images/Notifications.svg";
import VectorAdobe from "../../assets/images/Adobe.svg";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [exploreMenuAnchorEl, setExploreMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [hireMenuAnchorEl, setHireMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);

  // Handle Explore Menu
  const handleExploreMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setExploreMenuAnchorEl(event.currentTarget);
  };

  const handleExploreMenuClose = () => {
    setExploreMenuAnchorEl(null);
  };

  // Handle Hire Freelancers Menu
  const handleHireMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setHireMenuAnchorEl(event.currentTarget);
  };

  const handleHireMenuClose = () => {
    setHireMenuAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="default" sx={{ boxShadow: 1 }}>
      <Toolbar>
        {/* Logo */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="logo"
          sx={{ mr: 2 }}
        >
          <img
            src={VectorLogo}
            alt="VNxLabs Logo"
            style={{ width: 128, height: "auto" }}
          />
        </IconButton>

        {/* Navigation Bar */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* Explore Menu */}
          <Button
            onClick={handleExploreMenuClick}
            endIcon={<FaCaretDown />}
            sx={{ color: "text.primary" }}
          >
            Explore
          </Button>
          <Menu
            anchorEl={exploreMenuAnchorEl}
            open={Boolean(exploreMenuAnchorEl)}
            onClose={handleExploreMenuClose}
          >
            <MenuItem onClick={handleExploreMenuClose}>Option 1</MenuItem>
            <MenuItem onClick={handleExploreMenuClose}>Option 2</MenuItem>
            <MenuItem onClick={handleExploreMenuClose}>Option 3</MenuItem>
          </Menu>

          {/* Other navigation links */}
          <Button sx={{ color: "text.primary" }}>Assets</Button>
          <Button sx={{ color: "text.primary" }}>Jobs</Button>
          <Button sx={{ color: "text.primary" }}>
            Behance{" "}
            <span
              style={{
                marginLeft: 8,
                backgroundColor: "#1E88E5",
                color: "#FFF",
                padding: "2px 6px",
                borderRadius: 4,
                fontSize: "0.75rem",
              }}
            >
              Pro
            </span>
          </Button>

          {/* Hire Freelancers Menu */}
          <Button
            onClick={handleHireMenuClick}
            endIcon={<FaCaretDown />}
            sx={{ color: "text.primary" }}
          >
            Hire Freelancers
          </Button>
          <Menu
            anchorEl={hireMenuAnchorEl}
            open={Boolean(hireMenuAnchorEl)}
            onClose={handleHireMenuClose}
          >
            <MenuItem onClick={handleHireMenuClose}>Freelancer 1</MenuItem>
            <MenuItem onClick={handleHireMenuClose}>Freelancer 2</MenuItem>
            <MenuItem onClick={handleHireMenuClose}>Freelancer 3</MenuItem>
          </Menu>
        </Typography>

        {/* Notifications */}
        <IconButton edge="end" color="inherit" sx={{ mr: 2 }}>
          <img
            src={VectorNotifications}
            alt="Notifications"
            style={{ width: 24, height: "auto" }}
          />
        </IconButton>

        {/* Sign In / Sign Up */}
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button variant="outlined" sx={{ mr: 2 }}>
            Sign In
          </Button>
        </Link>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Sign Up
          </Button>
        </Link>

        {/* Adobe */}
        <IconButton edge="end" color="inherit" sx={{ ml: 2 }}>
          <img
            src={VectorAdobe}
            alt="Adobe"
            style={{ width: 72, height: "auto" }}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

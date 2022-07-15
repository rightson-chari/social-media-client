import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteOutlined from "@mui/icons-material/FavoriteOutlined";
import Home from "@mui/icons-material/Home";
import Search from "@mui/icons-material/Search";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MicNone from "@mui/icons-material/MicNone";
import MailOutline from "@mui/icons-material/MailOutline";
import Notifications from "@mui/icons-material/Notifications";
import styled from "styled-components";
const Bottom = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const Line = styled.div`
    width: 100%;
    height: 0.5px;
    background-color: rgba(255, 255, 255, 0.6);
  `;
  return (
    <>
      <BottomNavigation
        sx={{
          width: "100%",
          position: "fixed",
          pb: 1,
          bottom: 0,
          background: "rgb(7, 27, 47)",
          borderTop: "0.5px solid rgba(255,255,255,.5)",
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<Home sx={{ color: "rgba(200,200,200)" }} />}
        />
        <BottomNavigationAction
          label="Search"
          value="Search"
          icon={<Search sx={{ color: "rgba(200,200,200)" }} />}
        />
        <BottomNavigationAction
          label="Notification"
          value="notifications"
          icon={<Notifications sx={{ color: "rgba(200,200,200)" }} />}
        />
        <BottomNavigationAction
          label="Folder"
          value="folder"
          icon={<MailOutline sx={{ color: "rgba(200,200,200)" }} />}
        />
      </BottomNavigation>
    </>
  );
};

export default Bottom;

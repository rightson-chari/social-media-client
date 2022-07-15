import React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ShareIcon from "@mui/icons-material/Share";
import MicNoneIcon from "@mui/icons-material/MicNone";
import AddAPhoto from "@mui/icons-material/AddAPhoto";
import Gif from "@mui/icons-material/Gif";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Cover = styled.div`
  display: ${(params) => params.display !== true && "none"};
`;
const SpeedDials = ({ profile }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNavigation = (url) => {
    navigate(url);
  };
  const actions = [
    {
      icon: (
        <ShareIcon
          sx={{ color: "rgb(66,165,245)" }}
          onClick={() => handleNavigation("/tweet")}
        />
      ),
      name: "Tweet",
    },
    { icon: <MicNoneIcon sx={{ color: "rgb(66,165,245)" }} />, name: "Spaces" },
    { icon: <AddAPhoto sx={{ color: "rgb(66,165,245)" }} />, name: "Photos" },
    { icon: <Gif sx={{ color: "rgb(66,165,245)" }} />, name: "Gif" },
  ];
  return (
    <>
      <Cover
        style={{
          height: "100vh",
          width: "100vw",
          background: "rgba(0,0,0,.8)",
          position: "fixed",
          top: "4rem",
          left: 0,
        }}
        display={open}
      ></Cover>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "fixed", bottom: profile ? profile : 70, right: 16 }}
        icon={<SpeedDialIcon />}
        s
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default SpeedDials;

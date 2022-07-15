import React, { useState } from "react";
import Navbar from "../componets/Navbar";
import styled from "styled-components";
import Bottom from "../componets/Bottom";
import SpeedDials from "../componets/SpeedDial";
import Feed from "../componets/Feed";
import Sidebar from "../componets/Sidebar";

const Container = styled.div`
  min-height: 100vh;
  color: white;
  background-color: rgb(7, 27, 47);
`;

const Home = () => {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  return (
    <Container>
      <Sidebar open={open} closeDrawer={closeDrawer} />
      <Navbar openDrawer={openDrawer} />
      <Feed />
      <SpeedDials />
      <Bottom />
    </Container>
  );
};

export default Home;

import Avatar from "@mui/material/Avatar";
import React, { useEffect } from "react";
import styled from "styled-components";
import logo from "../images/logo.svg";
import StarOutline from "@mui/icons-material/StarOutline";
import axios from "axios";
import Notifications from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { useState } from "react";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const Container = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  position: sticky;
  z-index: 10;
  top: -1px;
  padding-right: 1rem;
  background-color: rgba(7, 27, 47, 0.98);
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.5);
`;
const Image = styled.img`
  width: 100px;
`;

const Navbar = ({ openDrawer }) => {
  const [user, setUser] = useState("");
  let id = localStorage.getItem("user");
  id = JSON.parse(id);
  id = id._id;

  useEffect(() => {
    axios
      .get(`/user?userId=${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        setUser(data);
      });
  }, []);

  return (
    <>
      <Container>
        <Avatar
          src={`${PF}/post/${user.profilePicture}`}
          sx={{ cursor: "pointer" }}
          onClick={openDrawer}
        ></Avatar>
        <Image src={logo} />

        <Badge badgeContent={5} color="warning">
          <Notifications sx={{ color: "white" }} />
        </Badge>
      </Container>
    </>
  );
};

export default Navbar;

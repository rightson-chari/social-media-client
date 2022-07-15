import React from "react";
import Sad from "@mui/icons-material/SentimentDissatisfied";
import Person from "@mui/icons-material/PersonAddAlt";
import Drawer from "@mui/material/Drawer";
import styled from "styled-components";
import Mute from "@mui/icons-material/VolumeOffOutlined";
import Block from "@mui/icons-material/BlockOutlined";
import Flag from "@mui/icons-material/FlagOutlined";
import { Delete, Pin } from "@mui/icons-material";
import axios from "axios";
const Container = styled.div`
  background: #000;
  width: 100%;
  color: white;
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Li = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.3rem;
  cursor: pointer;
`;
let id = localStorage.getItem("user");
if (id) {
  id = JSON.parse(id);
  id = id._id;
}

const BottomBar = ({ open, handleClose, info, postId }) => {
  const handleDelete = () => {
    axios
      .delete(`/post/${postId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        window.location.reload();
      });
  };

  const Render = () => (
    <List>
      <Li onClick={() => handleDelete()}>
        <Delete /> <span>Delete Tweet</span>
      </Li>
    </List>
  );

  return (
    <Drawer open={open} anchor="bottom" onClose={handleClose}>
      <Container>
        {id === info._id ? (
          <Render />
        ) : (
          <List>
            <Li>
              <Sad /> <span>Not Intrested in This Tweet</span>
            </Li>
            <hr />
            <Li>
              <Person /> <span>Follow {info.username}</span>
            </Li>
            <Li>
              <Mute /> <span>Mute {info.username}</span>
            </Li>
            <Li>
              <Block /> <span>Block {info.username}</span>
            </Li>
            <hr />
            <Li>
              <Flag /> <span>Report This Tweet</span>
            </Li>
          </List>
        )}
      </Container>
    </Drawer>
  );
};

export default BottomBar;

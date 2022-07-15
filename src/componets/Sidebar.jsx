import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Account from "@mui/icons-material/AccountBoxOutlined";
import Avatar from "@mui/material/Avatar";
import Logout from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Person from "@mui/icons-material/PersonOutlineOutlined";
import Topic from "@mui/icons-material/Topic";
import Bookmark from "@mui/icons-material/BookmarkBorderOutlined";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";
import { useState } from "react";
const Container = styled.div`
  background: #000;
  width: 250px;
  color: white;
  height: 100%;
`;
const User = styled.div`
  position: sticky;
  display: flex;
  flex-direction: column;
  top: -2px;
  background: black;
  gap: 0.7rem;
  padding-left: 0.7rem;
  padding-bottom: 10px;
`;
const Details = styled.div`
  display: flex;
  justify-content: space-between;
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
const Sidebar = ({ open, closeDrawer }) => {
  const [user, setUser] = useState();
  const [expand, setExpand] = useState(false);
  const userRaw = localStorage.getItem("user");
  const currentUser = JSON.parse(userRaw);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`/user?userId=${currentUser._id}`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res.data);
      });
  }, []);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Drawer anchor="left" open={open} onClose={closeDrawer}>
      <Container role="presentation">
        <User>
          <Link to={user ? `/profile/${user.username}` : ""}>
            <Avatar
              src={
                user
                  ? `${PF}/post/${user.profilePicture}`
                  : "https://picsum.photos/200/300"
              }
              sx={{ cursor: "pointer" }}
            ></Avatar>
          </Link>
          <Details>
            <span style={{ fontSize: "25px", fontWeight: "600" }}>
              {user ? user.username : " "}
            </span>{" "}
            <ExpandMore
              onClick={() => setExpand(!expand)}
              sx={{
                transform: `rotate(${expand && "-180deg"})`,
                cursor: "pointer",
              }}
            />
          </Details>
          <Details>
            <div>
              <span style={{ fontSize: "20px", fontWeight: "600" }}>
                {user ? user.following.length : " "}
              </span>
              <span
                style={{
                  fontSize: "17px",
                  fontWeight: "500",
                  marginLeft: "5px",
                  opacity: ".8",
                }}
              >
                Following
              </span>
            </div>
            <div style={{ marginRight: "10px" }}>
              <span style={{ fontSize: "20px", fontWeight: "600" }}>
                {user ? user.followers.length : " "}
              </span>
              <span
                style={{
                  fontSize: "17px",
                  fontWeight: "500",
                  marginLeft: "5px",
                  opacity: ".8",
                }}
              >
                Followers
              </span>
            </div>
          </Details>
        </User>
        <hr />
        {expand ? (
          <List>
            <Li onClick={() => navigate("/register")}>
              <Account /> <span>Create New Account</span>
            </Li>
            <Li
              onClick={() => {
                localStorage.clear();

                navigate("/login");
                window.location.reload();
              }}
            >
              <Logout /> <span>Logout</span>
            </Li>
          </List>
        ) : (
          <List>
            <Li onClick={() => navigate(`/profile/${user.username}`)}>
              <Person /> <span>Profile</span>
            </Li>
            <Li>
              <Bookmark /> <span>Bookmark</span>
            </Li>
            <Li>
              <Topic /> <span>Topic</span>
            </Li>
          </List>
        )}
      </Container>
    </Drawer>
  );
};

export default Sidebar;

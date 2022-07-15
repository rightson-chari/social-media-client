import { CalendarMonth, LocationCityOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileNav from "../componets/ProfileNav";
import SpeedDials from "../componets/SpeedDial";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TbBallon } from "react-icons/tb";
import Feed from "../componets/Feed";
import { format } from "timeago.js";
import axios from "axios";
const Container = styled.div`
  min-height: 100vh;
  background: rgba(0, 0, 0);
`;

const CoverPic = styled.div`
  height: 200px;
  width: 100%;
  position: relative;
  margin-bottom: 4rem;
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
const ProfilePicture = styled.img`
  bottom: -25%;
  left: 5px;
  height: 100px;
  width: 100px;
  border: 2px solid white;
  position: absolute;
  object-fit: cover;
  border-radius: 50%;
  border: transparent;
`;
const EditButton = styled.button`
  width: 100px;
  height: 40px;
  position: absolute;
  bottom: -25%;
  right: 10px;
  border: 1px solid white;
  color: white;
  background-color: transparent;
  border-radius: 30px;
  cursor: pointer;
`;
const FollowButton = styled.button`
  width: 100px;
  height: 40px;
  position: absolute;
  bottom: -25%;
  right: 10px;
  border: 1px solid white;
  color: white;
  background-color: transparent;
  border-radius: 30px;
  cursor: pointer;
`;
const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 1rem;
`;
const Span = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.3rem 0.5rem;
`;

const FollowContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Follow = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
  margin-top: 0.9rem;
  color: white;
`;
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const Profile = () => {
  const stringUser = localStorage.getItem("user");

  let currentUser = "";
  if (stringUser !== undefined) {
    currentUser = JSON.parse(stringUser);
  }

  const params = useParams();
  const username = params.username;
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);

  const [user, setUser] = useState("");
  const [value, setValue] = React.useState(0);
  const [followers, setFollowers] = useState([]);
  const [followed, setFollowed] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    fetch(`/user?username=${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const data = res.data;
        setFollowers(data.followers);
        setFollowed(data.followers.includes(currentUser._id));
        setUser(data);
      });
  }, [username]);

  const handleFollow = () => {
    if (followed) {
      axios
        .put(
          `/user/${user._id}/unfollow`,
          {},
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {});
    } else {
      axios
        .put(
          `/user/${user._id}/follow`,
          {},
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
    }

    setFollowed(!followed);
  };

  return (
    <Container>
      <ProfileNav />
      <CoverPic>
        <Image src={`${PF}/post/${user.coverPicture}`} />
        <ProfilePicture src={`${PF}/post/${user.profilePicture}`} />
        {/* <EditButton>
         
        </EditButton> */}
        {currentUser._id === user._id ? (
          <EditButton onClick={() => navigate(`/profile/${username}/edit`)}>
            Edit Profile
          </EditButton>
        ) : (
          <FollowButton onClick={() => handleFollow()}>
            {followed ? "Unfollow" : "Follow"}
          </FollowButton>
        )}
      </CoverPic>
      <UserDetails>
        <h2 style={{ color: "white", marginBottom: ".5rem" }}>{username}</h2>
        <p
          style={{ margin: ".2rem", padding: 0, color: "rgba(255,255,255,.8)" }}
        >
          {user ? user.bio : ""}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            color: "rgba(255,255,255,.6)",
          }}
        >
          <Span>
            <LocationCityOutlined />
            {user.city ? user.city : "Nairobi,Ngara,Kenya"}
          </Span>
          <Span>
            <TbBallon />
            {user.birthday ? user.birthday : "23, Oct, 2002"}
          </Span>

          <Span>
            <CalendarMonth />
            {user ? format(user.createdAt) : "Joined August 2020"}
          </Span>
        </div>
        <FollowContainer>
          <Follow>
            {user ? user.followers.length : 0}
            <span style={{ color: "white", opacity: 0.7, marginLeft: "10px" }}>
              Followers
            </span>{" "}
          </Follow>
          <Follow>
            {user ? user.following.length : null}
            <span style={{ color: "white", opacity: 0.7, marginLeft: "10px" }}>
              Followers
            </span>{" "}
          </Follow>
        </FollowContainer>
      </UserDetails>

      <Box
        sx={{
          width: "100%",
          borderBottom: "1px solid rgba(255,255,255,.6)",
          position: "sticky",
          top: "3.8rem",
          background: "rgba(0,0,0,.98)",
          zIndex: 10,
        }}
      >
        <Tabs
          onChange={handleChange}
          value={value}
          aria-label="Tabs where each tab needs to be selected manually"
        >
          <Tab label="Tweets" sx={{ color: "white" }} />
          <Tab label="Likes" sx={{ color: "white" }} />
          <Tab label="Media" sx={{ color: "white" }} />

          <Tab label="Tweets & relies" sx={{ color: "white" }} />
        </Tabs>
      </Box>
      {value === 0 ? <Feed id={user ? user._id : null} /> : null}
      {value === 1 ? <Feed likes={`/post/profile/likes/${user._id}`} /> : null}
      {value === 2 ? <Feed media={`/post/profile/media/${user._id}`} /> : null}
      {value === 3 ? (
        <Feed replies={`/comment/profile/${user.username}`} />
      ) : null}

      <SpeedDials profile={15} />
    </Container>
  );
};

export default Profile;

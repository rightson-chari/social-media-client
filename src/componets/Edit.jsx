import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileNav from "../componets/ProfileNav";
import SpeedDials from "../componets/SpeedDial";
import Button from "@mui/material/Button";
import axios from "axios";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const Container = styled.div`
  min-height: 100vh;
  background: rgba(0, 0, 0, 1);
  overflow-y: scroll;
`;

const CoverPic = styled.div`
  height: 150px;
  width: 100%;
  position: relative;
  margin-bottom: 2rem;
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
`;
const CoverCamera = styled.label`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* right: 0;
  bottom: 0; */
  position: absolute;
  margin: auto;
`;
const ProfileCamera = styled.label`
  top: 95%;
  left: 55px;
  z-index: 7;
  transform: translate(-50%, -50%);
  position: absolute;
  margin: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const Input = styled.input`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  color: white;
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.7);
  outline: none;
  padding: 0.3rem;
  font-size: 23px;

  &:focus {
    border-bottom: 2px solid rgb(25, 118, 210);
    background: rgba(255, 255, 255, 0.1);
  }
`;
const Label = styled.label`
  color: white;
  opacity: 0.7;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  margin-top: 1.2rem;
`;

const Edit = () => {
  const stringUser = localStorage.getItem("user");

  let currentUser = "";
  if (stringUser !== undefined) {
    currentUser = JSON.parse(stringUser);
  }

  const params = useParams();
  const username = params.username;
  const [user, setUser] = useState("");
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [value, setValue] = React.useState(0);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
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

        setName(data.username);
        setUser(data);
        setBio(data.bio);
        setCity(data.city);
      });
  }, [username]);
  const renameFile = (originalFile, newName) => {
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
  };
  const handleSubmit = () => {
    const data = { name, bio, city };
    if (cover) {
      const coverPic = new FormData();
      const coverName = `${Date.now()}${cover}`;
      const renamedFile = renameFile(cover, coverName);
      coverPic.append("file", renamedFile);
      coverPic.append("name", coverName);
      data.coverPicture = coverName;
      axios.post("/upload", coverPic, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
    if (profile) {
      const profilePic = new FormData();
      const profileName = `${Date.now()}${profile.name}`;
      const renamedFile = renameFile(profile, profileName);
      profilePic.append("file", renamedFile);
      profilePic.append("name", profileName);
      data.profilePicture = profileName;

      axios.post("/upload", profilePic, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
    axios
      .put(`/user/${user._id}`, data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {});
  };
  return (
    <Container>
      <ProfileNav edit={name} />
      <CoverPic>
        <CoverCamera htmlfor="coverpic">
          <CameraAltOutlined
            sx={{
              boxShadow:
                "5px 6px 4px rgba(0,0,0,.4),-5px -6px 4px rgba(0,0,0,.4)",
              color: "white",
              fontSize: "40px",
              cursor: "pointer",
            }}
          />
          <input
            type="file"
            id="coverpic"
            style={{ display: "none" }}
            accept=".png,.jpeg,.jpg"
            onChange={(e) => setCover(e.target.files[0])}
          />
        </CoverCamera>
        <ProfileCamera htmlfor="profilepic">
          <CameraAltOutlined
            sx={{
              boxShadow:
                "5px 6px 4px rgba(0,0,0,.4),-5px -6px 4px rgba(0,0,0,.4)",
              color: "white",
              fontSize: "40px",
              cursor: "pointer",
            }}
          />
          <input
            type="file"
            id="profilepic"
            style={{ display: "none" }}
            accept=".png,.jpeg,.jpg"
            onChange={(e) => setProfile(e.target.files[0])}
          />
        </ProfileCamera>
        <Image
          src={
            cover
              ? URL.createObjectURL(cover)
              : `${PF}/post/${user.coverPicture}`
          }
        />

        <ProfilePicture
          src={
            profile
              ? URL.createObjectURL(profile)
              : `${PF}/post/${user.profilePicture}`
          }
        />
      </CoverPic>
      <Form>
        {/* <TextField variant="filled" label="Name" placeholder /> */}
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {name}

        <Label htmlFor="bio">Bio</Label>
        <Input
          type="text"
          id="name"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <Label htmlFor="Location">City</Label>
        <Input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button onClick={handleSubmit} variant="outlined" sx={{ mt: 3 }}>
          Update
        </Button>
      </Form>

      <SpeedDials profile={15} />
    </Container>
  );
};

export default Edit;

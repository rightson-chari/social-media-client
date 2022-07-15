import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { MoreVert, Search } from "@mui/icons-material";

const Container = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  position: sticky;
  z-index: 10;
  top: -2px;
  padding-right: 1rem;
  background-color: rgba(0, 0, 0, 0.9);
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.5);
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const EditHeader = styled.span`
  font-size: 25px;
  color: white;
  font-weight: 600;
`;
const Span = styled.span`
  font-size: 20px;
  color: white;
  font-weight: 500;
  margin-left: 10px;
`;
const Back = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  justify-content: center;
  height: 30px;
  width: 30px;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
  gap: 1rem;
`;
const Button = styled.button`
  border-radius: 30px;
  width: 70px;
  height: 40px;
  background-color: white;
  font-size: 17px;
`;

const ProfileNav = ({ edit, username }) => {
  if (edit) {
    return (
      <Container>
        <Left>
          <Back>
            <Link to={`/profile/${edit}`}>
              <ArrowBack sx={{ color: "white" }} />
            </Link>
          </Back>
          <EditHeader>Edit Profile</EditHeader>
        </Left>

        <Button>Save</Button>
      </Container>
    );
  }
  if (username) {
    return (
      <Container>
        <Left>
          <Back>
            <Link to={`/`}>
              <ArrowBack sx={{ color: "white" }} />
            </Link>
          </Back>
          <Span>Tweet</Span>
        </Left>
      </Container>
    );
  } else {
    return (
      <>
        <Container>
          <Back>
            <Link to="/">
              <ArrowBack sx={{ color: "white" }} />
            </Link>
          </Back>
          <Right>
            <Back>
              <Search sx={{ color: "white" }} />
            </Back>
            <Back>
              <MoreVert sx={{ color: "white" }} />
            </Back>
          </Right>
        </Container>
      </>
    );
  }
};

export default ProfileNav;

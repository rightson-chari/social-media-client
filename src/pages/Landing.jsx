import React from "react";
import logo from "../images/logo.svg";
import styled from "styled-components";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0, 30, 60);
`;
const MinContainer = styled.div`
  display: grid;
  grid-template-columns: 1;
  grid-template-rows: 2fr 4fr 4fr;
  border-radius: 10px;
  height: 100vh;
  max-width: 500px;

  background-color: rgba(32, 33, 36, 0.5);
  /* box-shadow: 5px 5px 5px rgb(0, 0, 0, 0, 1); */
`;
const ImageContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 1rem;
`;
const Image = styled.img`
  width: 150px;
  opacity: 0.8;
`;
const Welcome = styled.div`
  width: 100%;
  padding: 0 1rem;
  margin: 0 1rem;
`;
const H1 = styled.h1`
  font-weight: 700;
  color: rgb(0, 125, 251);
  color: white;

  padding: 0;
  font-size: 45px;
`;
const Center = styled.div`
  padding: 1rem;
`;
const Bottom = styled.div`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: flex-end;
`;
const Span = styled.div`
  color: rgb(26, 147, 224);
`;
const Landing = () => {
  const navigate = useNavigate();
  const handleClick = (url) => {
    return navigate(url);
  };
  return (
    <Container>
      <MinContainer>
        <ImageContainer>
          <Image src={logo} alt="" />
        </ImageContainer>
        <Welcome>
          <H1>See Whats Happening in Kenya Right Now</H1>
        </Welcome>
        <Center>
          <Chip
            label="Create account"
            fullWidth
            size="large"
            sx={{
              width: "100%",
              fontSize: "23px",
              height: "50px",
              background: "rgb(26,147,224)",
              color: "white",
            }}
            onClick={() => handleClick("/register")}
          />
        </Center>
        <Bottom>
          Have an Account already?{" "}
          <Span onClick={() => handleClick("/login")}>Log In</Span>
        </Bottom>
      </MinContainer>
    </Container>
  );
};

export default Landing;

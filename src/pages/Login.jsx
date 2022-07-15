import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../images/logo.svg";
import { loginUser } from "../redux/features/loginSlice";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0, 30, 60);
  min-height: 100vh;
`;
const MinContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1;
  grid-template-rows: 2fr 4fr 2fr;
  background-color: rgba(32, 33, 36, 0.5);
  max-width: 500px;
`;
const Fcc = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const Top = styled.div`
  margin: 1.5rem 0.3rem;
`;
const H1 = styled.h1`
  color: white;
  margin-left: 5%;
  margin-top: 1rem;
`;
const H2 = styled.h4`
  margin-left: 5%;
  margin: 0.5rem 0 0 0;
  color: black;
`;
const Center = styled(Fcc)`
  background-color: rgba(255, 255, 255, 0.8);
  margin: 0 1rem;
  padding: 1rem;
  border-radius: 10px;
  row-gap: 2rem;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 4rem;
`;
const Image = styled.img`
  width: 150px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
`;
const ButtonContainer = styled.div`
  padding: 0.5rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled.button`
  padding: 0.8rem;
  background: transparent;
  border: 2px solid white;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const Login = () => {
  const navigate = useNavigate();
  const handleClick = (url) => navigate(url);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const data = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    dispatch(loginUser(user));
  };
  const handleClose = () => {
    setOpen(false);
    setMessage("");
  };
  useEffect(() => {
    setOpen(true);
    if (data.user.token) {
      setMessage("log in succesfull");
    } else {
      setMessage("Wrrong password or username");
    }
  }, [data.user, data.error]);
  return (
    <Container onSubmit={handleSubmit}>
      <MinContainer>
        <Top>
          <CancelOutlinedIcon
            sx={{ color: "white", cursor: "pointer" }}
            onClick={() => navigate("/welcome")}
          />
          <Image src={logo} />
          <H1>Login To Your Account</H1>
        </Top>
        <Center>
          <H2>USERNAME</H2>
          <TextField
            label="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <H2>Password</H2>
          <TextField
            label="Password"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Center>
        <Bottom>
          <Divider sx={{ background: "white" }} />
          <ButtonContainer>
            <Button onClick={() => navigate("/register")}>Register ?</Button>
            <Button type="submit">
              {" "}
              {data.loading ? "Loading..." : "Login"}
            </Button>
          </ButtonContainer>
        </Bottom>
        <Snackbar
          message={message}
          autoHideDuration={1000}
          open={open}
          onClose={handleClose}
        />
      </MinContainer>
    </Container>
  );
};

export default Login;

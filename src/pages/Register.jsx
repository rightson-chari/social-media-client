import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../images/logo.svg";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/features/Register";
import Cancel from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const Container = styled.form`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0, 30, 60);
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
  margin: 1rem;
`;
const H1 = styled.h1`
  color: white;
  margin-left: 5%;
  margin-top: 1rem;
`;
const Center = styled(Fcc)`
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3), -5px -5px 5px rgba(0, 0, 0, 0.3);
  margin: 1rem;
  padding: 1rem;
  border-radius: 10px;
  row-gap: 2rem;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5rem;
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
  padding: 0.5rem;
  background: transparent;
  border: 2px solid white;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;
const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const data = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (url) => navigate(url);
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
    };

    dispatch(registerUser(user));
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setOpen(true);
    console.log(data.data);
    if (data.data) {
      if (data.data.includes("registered")) {
        setMessage("user registered succesfully");
      } else {
        setMessage("Email or username in use");
      }
    }
    if (data.error) {
      setMessage("there was an error");
    }
  }, [data.data, data.error]);
  return (
    <Container onSubmit={handleSubmit}>
      <MinContainer>
        <Top>
          <Cancel
            sx={{ color: "white", cursor: "pointer" }}
            onClick={() => handleClick("/welcome")}
          />
          <Image src={logo} />
          <H1>Create Your Account</H1>
        </Top>
        <Center>
          <TextField
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
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
            <Button onClick={() => handleClick("/login")}>
              Already Have Account ?
            </Button>
            <Button type="submit">
              {" "}
              {data.loading ? "Loading" : "Create Account"}
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

export default Register;

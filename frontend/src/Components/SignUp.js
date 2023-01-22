import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
function SignUp() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = (e) => {
    e.preventDefault();
    axios
      .post("/auth/signup", { email, password, fullName })
      .then((res) => alert(res.data.message))
      .catch((err) => console.warn(err));

    navigate("/login");
  };
  return (
    <Container>
      
      <FormContainer>
        <h3>Sign-Up</h3>
        <InputContainer>
          <p>FullName</p>
          <input
            type="text"
            placeholder="John Cina..must be 4 ch"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        </InputContainer>
        <InputContainer>
          <p>Email</p>
          <input
            type="email"
            placeholder="example@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </InputContainer>
        <InputContainer>
          <p>Password</p>
          <input
            type="password"
            placeholder="******** must be 6 ch"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </InputContainer>
       
        <SignUpButton onClick={signup}>Create Account in BrainHub</SignUpButton>
      </FormContainer>

      <LoginButton onClick={() => navigate("/login")}>
        Back to Login
      </LoginButton>
    </Container>
  );
}
const Container = styled.div`
  width: 60%;
  min-width: 450px;
  height: fit-content;
  padding: 15px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.form`
  border: 1px solid lightgray;
  width: 55%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;

  h3 {
    font-size: 28px;
    font-weight: 400;
    line-height: 33px;
    align-items:center;
    
    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;

  p {
    font-size: 14px;
    font-weight: 600;
  }

  input {
    width: 95%;
    height: 33px;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-top: 5px;

    &:hover {
      border: 1px solid orange;
    }
  }
`;

const SignUpButton = styled.button`
  width: 100%;
  height: 35px;
  font-size: 12px;
  margin-top: 20px;

  &:hover {
    background-color: #dfdfdf;
    border: 1px solid gray;
  }
`;

const LoginButton = styled.button`
  width: 55%;
  height: 35px;
  background-color: brown;
  border: none;
  outline: none;
  border-radius: 10px;
  margin-top: 30px;
`;

export default SignUp;
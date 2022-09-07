import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import googleIcon from "../images/google.webp";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(theme) => theme.text};
  height: calc(100vh-56px);
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;
const Title = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.text};
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
  color: ${({ theme }) => theme.text};
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;
const Image = styled.img`
  height: 40px;
  vertical-align: middle;
  display: inline-block;
`;
const Link = styled.span`
  margin-left: 30px;
`;
const Sign = () => {
  const [name, setName] = useState("");
  const [_, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", { name, password });
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };
  // google sign method
  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        const { user } = result;
        axios
          .post("/auth/google", {
            email: user.email,
            name: user.displayName,
            image: user.photoURL,
          })
          .then((res) => {
            console.log(res.data);
            dispatch(loginSuccess(res.data));
            navigate("/");
          });
      })
      .catch(() => {
        dispatch(loginFailure());
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue LamaTube</SubTitle>
        <Input
          onChange={(e) => setName(e.target.value)}
          placeholder="username"
        />
        <Input
          onChange={(e) => setpassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <Button onClick={handleLogin}>Sign in</Button>
        {/* SIGN UP */}
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>
          Sign in with Google <Image src={googleIcon} />
        </Button>
        <Title>Sign up</Title>
        <Input
          onChange={(e) => setName(e.target.value)}
          placeholder="username"
        />
        <Input onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <Input
          onChange={(e) => setpassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default Sign;

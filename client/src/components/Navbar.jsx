import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Upload from "./Upload";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0 20px;
  position: relative;
`;
const Search = styled.div`
  position: absolute;
  width: 50%;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;
const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: inherit;
  width: 100%;
`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  @media (max-width: 630px) {
    display: none;
  }
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;
const Navbar = () => {
  const currentUser = useSelector((state) => state.user);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchOutlinedIcon
              type="click"
              onClick={() => navigate(`/search?q=${query}`)}
              style={{ cursor: "pointer" }}
            />
          </Search>
          {currentUser?.user?.name ? (
            <User>
              <VideoCallOutlinedIcon
                onClick={() => setOpen(true)}
                style={{ cursor: "pointer" }}
              />
              <Tooltip title={currentUser.user.name}>
                <Avatar src={currentUser && currentUser?.user?.image} />
              </Tooltip>
            </User>
          ) : (
            <Link
              to="sign"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;

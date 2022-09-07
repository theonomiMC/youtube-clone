import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import noImage from "../images/user.png";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ comment }) => {
  const { updatedAt, text, userId } = comment;
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      await axios.get(`/users/find/${userId}`).then((res) => setUser(res.data));
    };
    fetchUser();
  }, [userId]);
  // console.log(user);
  return (
    <Container>
      <Avatar src={user?.image || noImage} />
      <Details>
        <Name>
          John Doe <Date>{format(updatedAt)}</Date>
        </Name>
        <Text>{text}</Text>
      </Details>
    </Container>
  );
};

export default Comment;

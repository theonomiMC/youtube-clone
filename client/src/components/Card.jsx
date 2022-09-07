import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;
const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;
const Details = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  flex: 1;
`;
const ChannelImg = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;
const Texts = styled.div``;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;
// CARD COMPONENT
const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});
  const { _id, title, userId, imgUrl, videoUrl, views, createdAt } = video;

  useEffect(() => {
    const fetchChannel = async () => {
      const response = await axios.get(`/users/find/${userId}`);
      try {
        setChannel(response.data);
      } catch (err) {
        throw new Error();
      }
    };
    fetchChannel();
  }, [video, userId]);

  return (
    <Link
      to={`/video/${_id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Container type={type}>
        <Image type={type} src={imgUrl} />
        <Details type={type}>
          <ChannelImg type={type} />
          <Texts>
            <Title>{title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info type={type}>
              {views} views • {format(createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;

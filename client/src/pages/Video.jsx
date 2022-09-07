import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFailure,
  fetchStart,
  fetchSuccess,
  like,
  dislike,
} from "../redux/videoSlice";
import { subscribeChannel } from "../redux/userSlice";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
// import Card from "../components/Card";
import { format } from "timeago.js";
import Comments from "../components/Comments";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;
const VideoFrame = styled.video`
  width: 100%;
  max-width: 720px;
  height: 415px;
`;
const Video = () => {
  const currentUser = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fatchVideo = async () => {
      dispatch(fetchStart());
      try {
        const videoResult = await axios
          .get(`/videos/find/${path}`)
          .then((res) => dispatch(fetchSuccess(res.data)));
        // console.log("videoResult", videoResult);
        await axios
          .get(`/users/find/${videoResult?.payload.userId}`)
          .then((res) => {
            setChannel(res.data);
          });
      } catch (err) {
        dispatch(fetchFailure());
        console.log(err);
      }
    };
    fatchVideo();
  }, [path, dispatch]);

  const handleLike = async ({}) => {
    await axios.put(`/users/like/${currentVideo._id}`);
    currentUser && dispatch(like(currentUser.user._id));
  };
  const handleDislike = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`);
    currentUser && dispatch(dislike(currentUser.user._id));
  };
  const handleSubscribe = async ({ user }) => {
    if (user !== undefined) {
      user.user.subscriberUsers.includes(channel._id)
        ? await axios.put(`/users/unsub/${channel._id}`)
        : await axios.put(`/users/sub/${channel._id}`);
      dispatch(subscribeChannel(channel._id));
    } else {
      return;
    }
  };
  // console.log(currentVideo._id);
  return (
    <Container>
      <Content>
        <VideoWrapper>
          {/* <iframe
            width="100%"
            height="415"
            src={currentVideo?.videoUrl}
            title={currentVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}
          <VideoFrame src={currentVideo?.videoUrl + "#t=0.1"} controls />
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>
            {currentVideo.views} views • {format(currentVideo.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={currentUser && handleLike}>
              {currentVideo.likes.includes(currentUser?.user?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo.likes.length}
            </Button>
            <Button onClick={currentUser && handleDislike}>
              {currentUser &&
              currentVideo.dislikes.includes(currentUser?.user?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}
              {currentVideo.dislikes.length}
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.image} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers}</ChannelCounter>
              <Description>{currentVideo.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={(currentUser) => handleSubscribe(currentUser)}>
            {currentUser?.user?.subscriberUsers?.includes(channel._id)
              ? "UNSUBSCRIBE"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        {currentVideo._id ? (
          <Comments videoId={currentVideo._id} />
        ) : (
          "no video"
        )}
      </Content>
      {/* <Recommendation></Recommendation> */}
    </Container>
  );
};

export default Video;

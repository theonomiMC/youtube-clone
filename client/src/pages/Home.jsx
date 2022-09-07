import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get(`/videos/${type}`);
      try {
        setVideos(response.data);
      } catch (err) {
        setError("Couldn't get any video! Try again later!");
      }
    };
    fetchVideos();
  }, [type]);
  return (
    <Container>
      {error
        ? error
        : videos.map((video) => <Card key={video._id} video={video} />)}
    </Container>
  );
};

export default Home;

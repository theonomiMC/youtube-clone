import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const Search = () => {
  const [videos, setVideos] = useState([]);
  const q = useLocation().search;
  useEffect(() => {
    const searchVideos = async () => {
      const res = await axios.get(`/videos/search${q}`);

      setVideos(res.data);
    };
    searchVideos();
  }, [q]);
  console.log(videos);
  return (
    <Container>
      {videos.map((v) => (
        <Card key={v._id} video={v} />
      ))}
    </Container>
  );
};

export default Search;

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Comment from "./Comment";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFailure,
  fetchStart,
  fetchSuccess,
  postComment,
} from "../redux/commentSlice";
import noImage from "../images/user.png";
const Container = styled.div``;
const NewComment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Input = styled.input`
  border: none;
  caret-color: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.text};
  border-bottom: 1px solid ${(theme) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  &:focus {
    color: ${({ theme }) => theme.text};
  }
`;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
const Button = styled.button`
  padding: 10px 15px;
  background-color: transparent;
  border: 1px solid #202020;
  color: ${({ theme }) => theme.text};
  border-radius: 20px;
  font-weight: 500;
  margin-top: 10px;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 15px;
  &:hover {
    background-color: #202020;
    transition: all 0.5s ease-in-out;
  }
`;
const Comments = ({ videoId }) => {
  const { comments } = useSelector((state) => {
    console.log(state.comments);
    return state.comments;
  });
  const [newComment, setNewComment] = useState("");
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchComments = async () => {
      dispatch(fetchStart());
      try {
        await axios
          .get(`/comments/${videoId}`)
          .then((res) => dispatch(fetchSuccess(res.data)));
      } catch (err) {
        console.log(err.message);
        dispatch(fetchFailure());
      }
    };
    fetchComments();
  }, [videoId, dispatch]);

  const createComment = async (e) => {
    e.preventDefault();
    let data = {
      userId: currentUser.user._id,
      videoId,
      text: newComment,
    };
    await axios.post("/comments", {
      userId: currentUser.user._id,
      videoId,
      text: newComment,
    });
    dispatch(postComment(data));
  };
  const handleRest = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setNewComment("");
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.user?.image || noImage} />
        <Input
          type="text"
          name="comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add new comment"
        />
        <Buttons>
          <Button onClick={createComment}>Comment</Button>
          <Button onClick={handleRest}>Cancel</Button>
        </Buttons>
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  loading: false,
  error: false,
};
export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchSuccess: (state, action) => {
      state.comments = action.payload;
      state.loading = false;
      state.error = false;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    postComment: (state, action) => {
      state.comments.push(action.payload);
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, postComment } =
  commentSlice.actions;

export default commentSlice.reducer;

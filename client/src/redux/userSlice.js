import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: () => {
      return initialState;
    },
    subscribeChannel: (state, action) => {
      if (state.user.subscriberUsers.includes(action.payload)) {
        // state.user.subscriberUsers.push(action.payload);
        state.user.subscriberUsers.splice(
          state.user.subscriberUsers.findIndex((idx) => idx === action.payload),
          1
        );
      } else {
        state.user.subscriberUsers.push(action.payload);
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  subscribeChannel,
} = userSlice.actions;

export default userSlice.reducer;

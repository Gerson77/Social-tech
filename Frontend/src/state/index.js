import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  postSingle: null,
  notifications: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.posts = [];
      state.postSingle = null;
      state.notifications = []
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post.id === action.payload.post.id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setPostSingle: (state, action) => {
      state.postSingle = action.payload.postSingle;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload.notifications;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setPostSingle,
  setNotifications
} = authSlice.actions;
export default authSlice.reducer;

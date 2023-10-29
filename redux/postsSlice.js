const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, { payload }) {
      state.posts = payload;
    },
  },
});

export default postSlice.reducer;
export const { setPosts, removePosts } = postSlice.actions;

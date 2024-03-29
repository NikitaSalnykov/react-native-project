const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  userName: null,
  email: null,
  token: null,
  id: null,
  avatar: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.userName = payload.userName;
      state.email = payload.email;
      state.token = payload.token;
      state.id = payload.id;
      state.avatar = payload.avatar;
    },
    removeUser(state) {
      state.userName = null;
      state.email = null;
      state.token = null;
      state.id = null;
      state.avatar = null;
    },
    changeAvatar(state, { payload }) {
      state.avatar = payload.avatar;
    },
    removeAvatar(state) {
      state.avatar = null;
    },
  },
});

export default authSlice.reducer;
export const { setUser, removeUser, changeAvatar, removeAvatar } =
  authSlice.actions;

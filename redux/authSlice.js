const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  auth: {
    userName: null,
    email: null,
    token: null,
    id: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.auth.userName = payload.userName;
      state.auth.email = payload.email;
      state.auth.token = payload.token;
      state.auth.id = payload.id
    },
    removeUser(state) {
      state.auth.userName = null;
      state.auth.email = null;
      state.auth.token = null;
      state.auth.id = null
    },
  },
});

export default authSlice.reducer;
export const { setUser, removeUser } = authSlice.actions;

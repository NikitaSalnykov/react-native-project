const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  name: "",
  email: "",
  password: "",
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser(state, { payload }) {
      state.name = payload.name;
      state.email = payload.email;
      state.password = payload.password;
      state.token = payload.token;
    },
    loginUser(state, { payload }) {
      state.email = payload.email;
      state.password = payload.password;
      state.token = payload.token;
    },
    logoutUser(state) {
      state.name = "";
      state.email = "";
      state.password = "";
      state.token = null;
    },
  },
});

export default authSlice.reducer;
export const { registerUser, loginUser, logoutUser } = authSlice.actions;

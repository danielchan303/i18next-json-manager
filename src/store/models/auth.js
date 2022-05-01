const auth = {
  state: {
    user: null,
    isAuth: false,
  }, // initial state
  reducers: {
    login(state, payload) {
      state.user = payload;
      state.isAuth = true;
      return state;
    },
    logout(state) {
      state.user = null;
      state.isAuth = false;
      return state;
    },
  },
};

export default auth;

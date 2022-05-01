const connection = {
  state: {
    isConnected: false,
    socket: null,
  }, // initial state
  reducers: {
    setSocket(state, payload) {
      state.socket = payload.socket;
      return state;
    },
    setToConnected(state) {
      state.isConnected = true;
      return state;
    },
    setToDisconnected(state) {
      state.isConnected = false;
      return state;
    },
  },
};

export default connection;

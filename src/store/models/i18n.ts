export default {
  state: {}, // initial state
  reducers: {
    // handle state changes with pure functions
    newKey(state: any, payload: any) {
      if (!state.hasOwnProperty(payload.key)) {
        state[payload.key] = {};
      }
      return state;
    },
    modifyKey(state: any, payload: any) {
      state[payload.key] = payload.value;
      return state;
    },
    deleteKey(state: any, payload: any) {
      if (state.hasOwnProperty(payload.key)) {
        delete state[payload.key];
      }
      return state;
    },
  },
};

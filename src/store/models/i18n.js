import { sify } from "chinese-conv";

const i18n = {
  state: {}, // initial state
  reducers: {
    // handle state changes with pure functions
    importFromBackup(state, payload) {
      return payload;
    },
    createNewMainKey(state, payload) {
      if (!state.hasOwnProperty(payload.key)) {
        state[payload.key] = {};
      }
      return state;
    },
    changeMainKeyName(state, payload) {
      // create clone of the value
      const data = state[payload.key];
      // delete the entries
      delete state[payload.key];
      // assign the original data to new key
      state[payload.value] = data;
      return state;
    },
    deleteMainKey(state, payload) {
      delete state[payload.key];
      return state;
    },
    newNestedKey(state, payload) {
      if (!state[payload.key].hasOwnProperty(payload.nestedKey)) {
        state[payload.key][payload.nestedKey] = { en: "", tc: "", sc: "" };
      }
      return state;
    },
    updateNestedKey(state, payload) {
      const data = state[payload.mainKey][payload.nestedKey];
      delete state[payload.mainKey][payload.nestedKey];
      state[payload.mainKey][payload.newNestedKey] = data;
      return state;
    },
    updateNestedKeyValue(state, payload) {
      const { key, nestedKey, language, value } = payload;
      state[key][nestedKey][language] = value;
      state[key][nestedKey].sc = sify(state[key][nestedKey].tc);
      return state;
    },
    deleteNestedKeyValue(state, payload) {
      const { key, nestedKey } = payload;
      delete state[key][nestedKey];
      return state;
    },
  },
};

export default i18n;

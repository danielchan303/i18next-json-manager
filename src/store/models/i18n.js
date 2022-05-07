import { sify } from "chinese-conv";

const i18n = {
  state: [], // initial state
  reducers: {
    // handle state changes with pure functions
    importFromBackup(state, payload) {
      // const data = [];
      // for (let [mainKey, mainValue] of Object.entries(payload)) {
      //   const mainKeyData = [];
      //   for (let [nestedKey, nestedValue] of Object.entries(mainValue)) {
      //     mainKeyData.push({
      //       key: nestedKey,
      //       en: nestedValue.en,
      //       tc: nestedValue.tc,
      //       sc: nestedValue.sc,
      //     });
      //   }
      //   data.push({
      //     key: mainKey,
      //     values: mainKeyData,
      //   });
      // }
      // console.log("output data", data);
      return payload;
    },
    createNewMainKey(state, payload) {
      if (!state.some((item) => item.key === payload.key)) {
        state.push({ key: payload.key, values: [] });
      }
      return state;
    },
    changeMainKeyName(state, payload) {
      // find index
      const data = state[payload.mainIndex];
      // assign the original data to new key
      data.key = payload.value;
      return state;
    },
    deleteMainKey(state, payload) {
      state.splice(payload.mainIndex, 1);
      return state;
    },
    createNewNestedKey(state, payload) {
      const mainValue = state[payload.mainIndex];
      const nestedItem = mainValue.values.find(
        (item) => item.key === payload.nestedKey
      );
      if (!nestedItem) {
        mainValue.values.push({
          key: payload.nestedKey,
          en: "",
          tc: "",
          sc: "",
        });
      }
      return state;
    },
    updateNestedKey(state, payload) {
      const mainIndex = payload.mainIndex;
      const nestedIndex = payload.nestedIndex;
      const mainValue = state[mainIndex];
      // Update nested key
      mainValue.values[nestedIndex].key = payload.newNestedKey;
      return state;
    },
    updateNestedKeyValue(state, payload) {
      const { mainIndex, nestedIndex, language, value } = payload;
      const mainValue = state[mainIndex];
      const nestedItem = mainValue.values[nestedIndex];
      nestedItem[language] = value;
      // if typing tc, create sc as well
      if (language === "tc") {
        nestedItem.sc = sify(nestedItem.tc);
      }
      return state;
    },
    deleteNestedKeyValue(state, payload) {
      const { mainIndex, nestedIndex } = payload;
      const mainValue = state[mainIndex];
      mainValue.values.splice(nestedIndex, 1);
      return state;
    },
  },
};

export default i18n;

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
      const index = state.findIndex((item) => item.key === payload.key);
      state.splice(index, 1);
      return state;
    },
    newNestedKey(state, payload) {
      const mainValue = state.find((item) => item.key === payload.key);
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
      const { key, nestedKey, language, value } = payload;
      const mainValue = state.find((item) => item.key === key);
      const nestedItem = mainValue.values.find(
        (item) => item.key === nestedKey
      );
      nestedItem[language] = value;
      nestedItem.sc = sify(nestedItem.tc);
      return state;
    },
    deleteNestedKeyValue(state, payload) {
      const { key, nestedKey } = payload;
      const mainValue = state.find((item) => item.key === key);
      const nestedItemIndex = mainValue.values.findIndex(
        (item) => item.key === nestedKey
      );

      mainValue.values.splice(nestedItemIndex, 1);
      return state;
    },
  },
};

export default i18n;

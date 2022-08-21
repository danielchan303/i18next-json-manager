import { sify } from "chinese-conv";

const i18n = {
  state: [], // initial state
  reducers: {
    // handle state changes with pure functions
    importFromBackup(state, payload) {
      const { projectId, data } = payload;
      console.log("projectId", projectId, "data", data);
      const targetProject = state.find((project) => project._id === projectId);
      targetProject.data = data;
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
      return state;
    },
    getProjectsData(state, payload) {
      return payload;
    },
    createNewMainKey(state, payload) {
      if (
        !state
          .find((project) => project._id === payload.projectId)
          ?.data.some((item) => item.key === payload.key)
      ) {
        state
          .find((project) => project._id === payload.projectId)
          ?.data.push({ key: payload.key, values: [] });
      }
      return state;
    },
    changeMainKeyName(state, payload) {
      // find index
      const data = state.find((project) => project._id === payload.projectId)
        ?.data[payload.mainIndex];
      // assign the original data to new key
      data.key = payload.value;
      return state;
    },
    deleteMainKey(state, payload) {
      state
        .find((project) => project._id === payload.projectId)
        ?.data.splice(payload.mainIndex, 1);
      return state;
    },
    createNewNestedKey(state, payload) {
      const mainValue = state.find(
        (project) => project._id === payload.projectId
      )?.data[payload.mainIndex];
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
      const mainValue = state.find(
        (project) => project._id === payload.projectId
      )?.data[mainIndex];
      // Update nested key
      mainValue.values[nestedIndex].key = payload.newNestedKey;
      return state;
    },
    updateNestedKeyValue(state, payload) {
      const { mainIndex, nestedIndex, language, value } = payload;
      const mainValue = state.find(
        (project) => project._id === payload.projectId
      )?.data[mainIndex];
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
      const mainValue = state.find(
        (project) => project._id === payload.projectId
      )?.data[mainIndex];
      mainValue.values.splice(nestedIndex, 1);
      return state;
    },
  },
};

export default i18n;

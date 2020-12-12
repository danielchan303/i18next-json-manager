import { init } from "@rematch/core";
import immerPlugin from "@rematch/immer";
import storage from "redux-persist/lib/storage";
import persistPlugin from "@rematch/persist";
import i18n from "./models/i18n";

const persistConfig = {
  key: "root",
  storage,
};

const store = init({
  models: { i18n },
  plugins: [immerPlugin(), persistPlugin(persistConfig)],
});

export default store;

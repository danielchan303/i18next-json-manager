import { init } from "@rematch/core";
import immerPlugin from "@rematch/immer";
import storage from "redux-persist/lib/storage";
import persistPlugin from "@rematch/persist";
import i18n from "./models/i18n";
import auth from "./models/auth";
import connection from "./models/connection";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["i18n"],
};

const store = init({
  models: { i18n, auth, connection },
  plugins: [immerPlugin(), persistPlugin(persistConfig)],
});

export default store;

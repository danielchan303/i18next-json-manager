import "./logo.svg";
import "./App.css";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "./component/AppBar";
import { useAuthStateListener } from "./services/firebase";
import useSocket from "./services/socketio";

import I18nManager from "./component/I18nManager";

function App() {
  useAuthStateListener();
  useSocket();
  const dispatch = useDispatch();
  const i18n = useSelector((state) => state.i18n);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isConnected = useSelector((state) => state.connection.isConnected);
  const socket = useSelector((state) => state.connection.socket);

  const createNewMainKey = () => {
    const key = prompt("Enter the new key name: ");
    if (key) {
      dispatch.i18n.createNewMainKey({ key });
      if (socket) {
        socket.emit("createNewMainKey", { key });
      }
    }
  };

  const changeMainKeyName = (mainIndex, value) => {
    dispatch.i18n.changeMainKeyName({ mainIndex, value });
    if (socket) {
      socket.emit("changeMainKeyName", { mainIndex, value });
    }
  };

  const deleteMainKey = (mainIndex) => {
    const confirm = prompt("Are you sure to delete? Type 'yes' to confirm");
    if (confirm?.toLocaleLowerCase() === "yes") {
      dispatch.i18n.deleteMainKey({ mainIndex });
      if (socket) {
        socket.emit("deleteMainKey", { mainIndex });
      }
    }
  };

  const createNewNestedKey = (mainIndex) => {
    const nestedKey = prompt("Enter the new nested key name: ");
    if (nestedKey) {
      dispatch.i18n.createNewNestedKey({ mainIndex, nestedKey });
      if (socket) {
        socket.emit("createNewNestedKey", { mainIndex, nestedKey });
      }
    }
  };

  const updateNestedKey = (mainIndex, nestedIndex, newNestedKey) => {
    console.log(
      "mainIndex",
      mainIndex,
      "nestedIndex",
      nestedIndex,
      "newNestedKey",
      newNestedKey
    );
    dispatch.i18n.updateNestedKey({ mainIndex, nestedIndex, newNestedKey });
    if (socket) {
      socket.emit("updateNestedKey", { mainIndex, nestedIndex, newNestedKey });
    }
  };

  const updateNestedKeyValue = ({
    mainIndex,
    nestedIndex,
    language,
    value,
  }) => {
    dispatch.i18n.updateNestedKeyValue({
      mainIndex,
      nestedIndex,
      language,
      value,
    });
    if (socket) {
      socket.emit("updateNestedKeyValue", {
        mainIndex,
        nestedIndex,
        language,
        value,
      });
    }
  };

  const deleteNestedKeyValue = (mainIndex, nestedIndex) => {
    console.log("deleteNestedKeyValue", mainIndex, nestedIndex);
    const response = prompt("Are you sure to delete? type 'yes' to confirm");
    if (response === "yes") {
      dispatch.i18n.deleteNestedKeyValue({ mainIndex, nestedIndex });
      if (socket) {
        socket.emit("deleteNestedKeyValue", { mainIndex, nestedIndex });
      }
    }
  };

  const getLangJSON = (language) => {
    const output = {};
    for (let mainItem of i18n) {
      const subObj = {};
      for (let nestedItem of mainItem.values) {
        subObj[nestedItem.key] = nestedItem[language];
      }
      output[mainItem.key] = subObj;
    }
    return JSON.stringify({ translation: output }, undefined, 4);
  };

  return (
    <div className="App">
      <AppBar getLangJSON={getLangJSON} createNewMainKey={createNewMainKey} />
      <main>
        <div className="card">
          {isAuth && !isConnected ? (
            <h2>Loading</h2>
          ) : (
            <div>
              <I18nManager
                i18n={i18n}
                changeMainKeyName={changeMainKeyName}
                deleteMainKey={deleteMainKey}
                createNewNestedKey={createNewNestedKey}
                updateNestedKey={updateNestedKey}
                updateNestedKeyValue={updateNestedKeyValue}
                deleteNestedKeyValue={deleteNestedKeyValue}
              />
            </div>
          )}
        </div>
        {/* <div className="card">
          <h2>Output</h2>
          <p>{JSON.stringify(i18n)}</p>
          <h3>en</h3>
          <p>{getLangJSON("en")}</p>
          <h3>tc</h3>
          <p>{getLangJSON("tc")}</p>
          <h3>sc</h3>
          <p>{getLangJSON("sc")}</p>
        </div> */}
      </main>
    </div>
  );
}

export default App;

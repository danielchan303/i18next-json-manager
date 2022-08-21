import "../logo.svg";
import "../App.css";
import * as React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "../component/AppBar";

import I18nManager from "../component/I18nManager";

function ProjectDetails() {
  const dispatch = useDispatch();
  let { projectId } = useParams();
  const i18n = useSelector((state) => state.i18n);
  const socket = useSelector((state) => state.connection.socket);

  const targetProject = i18n.find((project) => project._id === projectId);

  const createNewMainKey = () => {
    const key = prompt("Enter the new key name: ");
    if (key) {
      dispatch.i18n.createNewMainKey({ projectId, key });
      if (socket) {
        socket.emit("createNewMainKey", { projectId, key });
      }
    }
  };

  const changeMainKeyName = (mainIndex, value) => {
    dispatch.i18n.changeMainKeyName({ projectId, mainIndex, value });
    if (socket) {
      socket.emit("changeMainKeyName", { projectId, mainIndex, value });
    }
  };

  const deleteMainKey = (mainIndex) => {
    const confirm = prompt("Are you sure to delete? Type 'yes' to confirm");
    if (confirm?.toLocaleLowerCase() === "yes") {
      dispatch.i18n.deleteMainKey({ projectId, mainIndex });
      if (socket) {
        socket.emit("deleteMainKey", { projectId, mainIndex });
      }
    }
  };

  const createNewNestedKey = (mainIndex) => {
    const nestedKey = prompt("Enter the new nested key name: ");
    if (nestedKey) {
      dispatch.i18n.createNewNestedKey({ projectId, mainIndex, nestedKey });
      if (socket) {
        socket.emit("createNewNestedKey", { projectId, mainIndex, nestedKey });
      }
    }
  };

  const updateNestedKey = (mainIndex, nestedIndex, newNestedKey) => {
    dispatch.i18n.updateNestedKey({
      projectId,
      mainIndex,
      nestedIndex,
      newNestedKey,
    });
    if (socket) {
      socket.emit("updateNestedKey", {
        projectId,
        mainIndex,
        nestedIndex,
        newNestedKey,
      });
    }
  };

  const updateNestedKeyValue = ({
    mainIndex,
    nestedIndex,
    language,
    value,
  }) => {
    dispatch.i18n.updateNestedKeyValue({
      projectId,
      mainIndex,
      nestedIndex,
      language,
      value,
    });
    if (socket) {
      socket.emit("updateNestedKeyValue", {
        projectId,
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
      dispatch.i18n.deleteNestedKeyValue({ projectId, mainIndex, nestedIndex });
      if (socket) {
        socket.emit("deleteNestedKeyValue", {
          projectId,
          mainIndex,
          nestedIndex,
        });
      }
    }
  };

  const getLangJSON = (language) => {
    const output = {};
    if (!targetProject?.data) {
      return "";
    }
    for (let mainItem of targetProject?.data) {
      const subObj = {};
      for (let nestedItem of mainItem.values) {
        subObj[nestedItem.key] = nestedItem[language].replace(/\\n/g, "\n");
      }
      output[mainItem.key] = subObj;
    }
    return JSON.stringify({ translation: output }, undefined, 4);
  };

  return (
    <>
      <AppBar getLangJSON={getLangJSON} createNewMainKey={createNewMainKey} />
      <main>
        <div className="card">
          <div>
            <I18nManager
              i18n={targetProject?.data}
              changeMainKeyName={changeMainKeyName}
              deleteMainKey={deleteMainKey}
              createNewNestedKey={createNewNestedKey}
              updateNestedKey={updateNestedKey}
              updateNestedKeyValue={updateNestedKeyValue}
              deleteNestedKeyValue={deleteNestedKeyValue}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default ProjectDetails;

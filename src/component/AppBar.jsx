import React from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginHandler, signOutHandler } from "../services/firebase";

const AppBar = (props) => {
  let params = useParams();
  const { projectId } = params;

  const { createNewMainKey, getLangJSON } = props;
  const dispatch = useDispatch();
  const i18n = useSelector((state) => state.i18n);
  const targetProject = i18n.find((project) => project._id === projectId);
  const projectName = targetProject?.projectName;

  const isAuth = useSelector((state) => state.auth.isAuth);
  const isConnected = useSelector((state) => state.connection.isConnected);
  const socket = useSelector((state) => state.connection.socket);

  const backupRef = React.useRef();
  const enRef = React.useRef();
  const tcRef = React.useRef();
  const scRef = React.useRef();

  const createNewProjectHandler = () => {
    const projectName = prompt("New Project Name");
    if (projectName) {
      socket.emit("createNewProject", { projectName });
    }
  };

  const importHandler = () => {
    const backup = prompt("Input the backup below");
    console.log("socket", socket);
    if (!!backup & !!socket) {
      dispatch.i18n.importFromBackup({ projectId, data: JSON.parse(backup) });
      socket.emit("importFromBackup", { projectId, data: backup });
    }
  };

  const downloadHandler = () => {
    backupRef.current.click();
    enRef.current.click();
    tcRef.current.click();
    scRef.current.click();
  };

  const createDownloadUrl = (content) => {
    return `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`;
  };

  let backupJsonString, enJsonString, tcJsonString, scJsonString;
  if (getLangJSON) {
    backupJsonString = createDownloadUrl(
      JSON.stringify(i18n?.find((project) => project._id === projectId)?.data)
    );
    enJsonString = createDownloadUrl(getLangJSON("en"));
    tcJsonString = createDownloadUrl(getLangJSON("tc"));
    scJsonString = createDownloadUrl(getLangJSON("sc"));
  }

  const backgroundColor =
    isAuth && !isConnected ? "red" : isAuth && isConnected ? "green" : "black";

  return (
    <header className="App-header" style={{ backgroundColor }}>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <h1 id="heading">
          i18n Manager{projectName ? `- ${projectName}` : ""}
        </h1>
      </Link>
      <div>
        {projectId ? (
          <>
            <button className="header-button" onClick={createNewMainKey}>
              Add main category
            </button>
            <button className="header-button" onClick={importHandler}>
              Import
            </button>
            <button className="header-button" onClick={downloadHandler}>
              Download
            </button>
          </>
        ) : isAuth && !projectId ? (
          <button className="header-button" onClick={createNewProjectHandler}>
            New Project
          </button>
        ) : null}
        {!isAuth ? (
          <button className="header-button" onClick={loginHandler}>
            Login
          </button>
        ) : (
          <button className="header-button" onClick={signOutHandler}>
            Logout
          </button>
        )}
      </div>
      {projectId ? (
        <div style={{ display: "none" }}>
          <a
            ref={backupRef}
            style={{ display: "none" }}
            href={backupJsonString}
            download="backup.json"
          >
            Backup
          </a>
          <a
            ref={enRef}
            style={{ display: "none" }}
            href={enJsonString}
            download="en.json"
          >
            EN
          </a>
          <a
            ref={tcRef}
            style={{ display: "none" }}
            href={tcJsonString}
            download="tc.json"
          >
            TC
          </a>
          <a
            ref={scRef}
            style={{ display: "none" }}
            href={scJsonString}
            download="sc.json"
          >
            SC
          </a>
        </div>
      ) : null}
    </header>
  );
};

export default AppBar;

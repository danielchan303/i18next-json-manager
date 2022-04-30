import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginHandler } from "../services/firebase";

const AppBar = (props) => {
  const { createNewMainKey, getLangJSON } = props;
  const dispatch = useDispatch();
  const i18n = useSelector((state) => state.i18n);
  const backupRef = React.useRef();
  const enRef = React.useRef();
  const tcRef = React.useRef();
  const scRef = React.useRef();

  const importHandler = () => {
    const backup = prompt("Input the backup below");
    if (backup) {
      dispatch.i18n.importFromBackup(JSON.parse(backup));
    }
  };

  const downloadHandler = () => {
    backupRef.current.click();
    enRef.current.click();
    tcRef.current.click();
    scRef.current.click();
  };

  const createDownloadUrl = (content) => {
    return `data:text/plain;charset=utf-8,${encodeURIComponent(
      JSON.stringify(i18n)
    )}`;
  };

  return (
    <header className="App-header">
      <h1 id="heading">i18n Manager</h1>
      <div>
        <button className="header-button" onClick={createNewMainKey}>
          Add main category
        </button>
        <button className="header-button" onClick={importHandler}>
          Import
        </button>
        <button className="header-button" onClick={downloadHandler}>
          Download
        </button>
        <button className="header-button" onClick={loginHandler}>
          Login
        </button>
      </div>
      <div style={{ display: "none" }}>
        <a
          ref={backupRef}
          style={{ display: "none" }}
          href={createDownloadUrl(JSON.stringify(i18n))}
          download="backup.json"
        >
          Backup
        </a>
        <a
          ref={enRef}
          style={{ display: "none" }}
          href={createDownloadUrl(getLangJSON("en"))}
          download="en.json"
        >
          EN
        </a>
        <a
          ref={tcRef}
          style={{ display: "none" }}
          href={createDownloadUrl(getLangJSON("tc"))}
          download="tc.json"
        >
          TC
        </a>
        <a
          ref={scRef}
          style={{ display: "none" }}
          href={createDownloadUrl(getLangJSON("sc"))}
          download="sc.json"
        >
          SC
        </a>
      </div>
    </header>
  );
};

export default AppBar;

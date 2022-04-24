import logo from "./logo.svg";
import "./App.css";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import Row from "./component/Row";

function App() {
  const dispatch = useDispatch();
  const i18n = useSelector((state) => state.i18n);

  const createNewMainKey = () => {
    const key = prompt("Enter the new key name: ");
    if (key) {
      dispatch.i18n.createNewMainKey({ key });
    }
  };

  const changeMainKeyName = (mainIndex, value) => {
    dispatch.i18n.changeMainKeyName({ mainIndex, value });
  };

  const deleteMainKey = (key) => {
    dispatch.i18n.deleteMainKey({ key });
  };

  const createNewNestedKey = (key) => {
    const nestedKey = prompt("Enter the new nested key name: ");
    if (nestedKey) {
      dispatch.i18n.newNestedKey({ key, nestedKey });
    }
  };

  const updateNestedKey = (mainIndex, nestedIndex, newNestedKey) => {
    dispatch.i18n.updateNestedKey({ mainIndex, nestedIndex, newNestedKey });
  };

  const updateNestedKeyValue = ({ key, nestedKey, language, value }) => {
    dispatch.i18n.updateNestedKeyValue({ key, nestedKey, language, value });
  };

  const deleteNestedKeyValue = (key, nestedKey) => {
    const response = prompt("Are you sure to delete? type 'yes' to cofirm");
    if (response === "yes") {
      dispatch.i18n.deleteNestedKeyValue({ key, nestedKey });
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

  const output = getLangJSON("tc");
  console.log("output", output);

  const backupRef = React.useRef();
  const enRef = React.useRef();
  const tcRef = React.useRef();
  const scRef = React.useRef();

  return (
    <div className="App">
      <header className="App-header">
        <h1 id="heading">i18n Manager</h1>
        <div>
          <button className="header-button" onClick={createNewMainKey}>
            Add main category
          </button>
          <button
            className="header-button"
            onClick={() => {
              const backup = prompt("Input the backup below");
              if (backup) {
                dispatch.i18n.importFromBackup(JSON.parse(backup));
              }
            }}
          >
            Import
          </button>
          <button
            className="header-button"
            onClick={() => {
              backupRef.current.click();
              enRef.current.click();
              tcRef.current.click();
              scRef.current.click();
            }}
          >
            Download
          </button>
        </div>
      </header>
      <main>
        <div className="card horizontalRow">
          <a
            ref={backupRef}
            style={{ display: "none" }}
            href={
              "data:text/plain;charset=utf-8," +
              encodeURIComponent(JSON.stringify(i18n))
            }
            download="backup.json"
          >
            Backup
          </a>
          <a
            ref={enRef}
            style={{ display: "none" }}
            href={
              "data:text/plain;charset=utf-8," +
              encodeURIComponent(getLangJSON("en"))
            }
            download="en.json"
          >
            EN
          </a>
          <a
            ref={tcRef}
            style={{ display: "none" }}
            href={
              "data:text/plain;charset=utf-8," +
              encodeURIComponent(getLangJSON("tc"))
            }
            download="tc.json"
          >
            TC
          </a>
          <a
            ref={scRef}
            style={{ display: "none" }}
            href={
              "data:text/plain;charset=utf-8," +
              encodeURIComponent(getLangJSON("sc"))
            }
            download="sc.json"
          >
            SC
          </a>
        </div>
        <div className="card">
          <div>
            <Row
              i18n={i18n}
              changeMainKeyName={changeMainKeyName}
              deleteMainKey={deleteMainKey}
              createNewNestedKey={createNewNestedKey}
              updateNestedKey={updateNestedKey}
              updateNestedKeyValue={updateNestedKeyValue}
              deleteNestedKeyValue={deleteNestedKeyValue}
            />
          </div>
        </div>
        <div className="card">
          <h2>Output</h2>
          <p>{JSON.stringify(i18n)}</p>
          <h3>en</h3>
          <p>{getLangJSON("en")}</p>
          <h3>tc</h3>
          <p>{getLangJSON("tc")}</p>
          <h3>sc</h3>
          <p>{getLangJSON("sc")}</p>
        </div>
      </main>
    </div>
  );
}

export default App;

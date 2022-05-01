import * as React from "react";

const Row = (props) => {
  const lastMainKey = React.useRef();
  const lastNestedKey = React.useRef();

  const updateNestedKeyHandler = (mainIndex, nestedIndex, newNestedKey) => {
    props.updateNestedKey(mainIndex, nestedIndex, newNestedKey);
  };

  const onMainKeyBlurCheck = (array, mainIndex) => {
    const keys = array.map((item) => item.key);
    const keysWithoutDuplicate = [...new Set(keys)];
    if (keys.length !== keysWithoutDuplicate.length) {
      alert("Key cannot be duplicate");
      // reverse key update
      props.changeMainKeyName(mainIndex, lastMainKey.current);
    }
  };

  const onNestedKeyBlurCheck = (array, mainIndex, nestedIndex) => {
    const keys = array.map((item) => item.key);
    console.log("onBlur array", keys);
    const keysWithoutDuplicate = [...new Set(keys)];
    if (keys.length !== keysWithoutDuplicate.length) {
      alert("Key cannot be duplicate");
      // reverse key update
      updateNestedKeyHandler(mainIndex, nestedIndex, lastNestedKey.current);
    }
  };

  const nestedValueChangeHandler = (
    mainIndex,
    nestedIndex,
    language,
    value
  ) => {
    props.updateNestedKeyValue({
      mainIndex,
      nestedIndex,
      language,
      value,
    });
  };

  const fillEmptyHandler = (mainIndex, nestedIndex, nestedValue) => {
    if (nestedValue.tc === "") {
      props.updateNestedKeyValue({
        mainIndex,
        nestedIndex,
        language: "tc",
        value: nestedValue.en,
      });
    }
    if (nestedValue.sc === "") {
      props.updateNestedKeyValue({
        mainIndex,
        nestedIndex,
        language: "sc",
        value: nestedValue.en,
      });
    }
  };

  return (
    <div>
      {props.i18n.map((item, mainIndex) => {
        return (
          <>
            <div className="horizontalRow">
              <input
                id="mainKeyInput"
                type="text"
                value={item.key}
                onChange={(event) => {
                  // Change main key
                  const value = event.target.value;
                  props.changeMainKeyName(mainIndex, value);
                }}
                onFocus={(event) => {
                  // save the lastMainKey, in case already exist revert
                  lastMainKey.current = event.target.value;
                }}
                onBlur={() => {
                  // check if key already exist, revert
                  onMainKeyBlurCheck(props.i18n, mainIndex);
                }}
              />
              <button
                onClick={() => {
                  // create new nested key
                  props.createNewNestedKey(mainIndex);
                }}
              >
                Add item
              </button>
              <button
                onClick={() => {
                  // delete main key
                  props.deleteMainKey(mainIndex);
                }}
              >
                Delete Nested Item
              </button>
            </div>
            {Object.entries(item.values).length > 0 ? (
              <div className="groupContainer">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: 1 }}>key</th>
                      <th>en</th>
                      <th>tc</th>
                      <th>sc</th>
                      <th>Del</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.values.map((nestedItem, nestedIndex) => {
                      const lastNestedKeySaver = (event) =>
                        (lastNestedKey.current = event.target.value);

                      const checkDuplicateHandler = () =>
                        onNestedKeyBlurCheck(
                          item.values,
                          mainIndex,
                          nestedIndex
                        );

                      return (
                        <tr>
                          <td>
                            <div className="flexBox">
                              <input
                                style={{ flex: 1 }}
                                type="text"
                                value={nestedItem.key}
                                onChange={(event) => {
                                  updateNestedKeyHandler(
                                    mainIndex,
                                    nestedIndex,
                                    event.target.value
                                  );
                                }}
                                onFocus={lastNestedKeySaver}
                                onBlur={checkDuplicateHandler}
                              />
                              <button
                                className="copy-button"
                                data-clipboard-text={`t('${item.key}.${nestedItem.key}')`}
                              >
                                Copy
                              </button>
                            </div>
                          </td>
                          <td>
                            <div className="flexBox">
                              <input
                                type="text"
                                value={nestedItem.en}
                                onChange={(event) =>
                                  nestedValueChangeHandler(
                                    mainIndex,
                                    nestedIndex,
                                    "en",
                                    event.target.value
                                  )
                                }
                                onBlur={() =>
                                  fillEmptyHandler(
                                    mainIndex,
                                    nestedIndex,
                                    nestedItem
                                  )
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <div className="flexBox">
                              <input
                                type="text"
                                value={nestedItem.tc}
                                onChange={(event) =>
                                  nestedValueChangeHandler(
                                    mainIndex,
                                    nestedIndex,
                                    "tc",
                                    event.target.value
                                  )
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <div className="flexBox">
                              <input
                                type="text"
                                value={nestedItem.sc}
                                onChange={(event) =>
                                  nestedValueChangeHandler(
                                    mainIndex,
                                    nestedIndex,
                                    "sc",
                                    event.target.value
                                  )
                                }
                              />
                            </div>
                          </td>
                          <td style={{ width: 1 }}>
                            <button
                              onClick={() => {
                                // delete nested item
                                props.deleteNestedKeyValue(
                                  mainIndex,
                                  nestedIndex
                                );
                              }}
                            >
                              del
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button
                  className="insertARowHereButton"
                  onClick={() => {
                    // create new nested key
                    props.createNewNestedKey(mainIndex);
                  }}
                >
                  + Insert a row here
                </button>
              </div>
            ) : null}
          </>
        );
      })}
    </div>
  );
};

export default Row;

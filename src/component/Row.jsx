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
    <>
      {props.i18n.map((item, mainIndex) => {
        return (
          <>
            <div className="horizontalRow">
              <input
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
              <>
                <table>
                  <thead>
                    <tr>
                      <th>key</th>
                      <th>en</th>
                      <th>tc</th>
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
                            <input
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
                          </td>
                          <td>
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
                          </td>
                          <td>
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
                          </td>
                          <td>
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
                <br />
              </>
            ) : null}
          </>
        );
      })}
    </>
  );
};

export default Row;

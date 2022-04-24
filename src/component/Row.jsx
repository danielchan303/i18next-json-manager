import * as React from "react";

const Row = (props) => {
  const lastMainKey = React.useRef();
  const lastNestedKey = React.useRef();

  const deleteMainKeyHandler = (mainKey) => {
    const confirm = prompt("Are you sure to delete? Type 'yes' to confirm");
    if (confirm.toLocaleLowerCase() === "yes") {
      props.deleteMainKey(mainKey);
    }
  };

  const updateNestedKey = (mainIndex, nestedIndex, newNestedKey) => {
    console.log("lastNestedKey", lastNestedKey.current);
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
      updateNestedKey(mainIndex, nestedIndex, lastNestedKey.current);
    }
  };

  const nestedKeyValueChangeHandler = (key, nestedKey, language, value) => {
    props.updateNestedKeyValue({ key, nestedKey, language, value });
  };

  const fillEmptyHandler = (key, nestedKey, nestedValue) => {
    if (nestedValue.tc === "") {
      props.updateNestedKeyValue({
        key,
        nestedKey,
        language: "tc",
        value: nestedValue.en,
      });
    }
    if (nestedValue.sc === "") {
      props.updateNestedKeyValue({
        key,
        nestedKey,
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
                  props.changeMainKeyName(mainIndex, event.target.value);
                }}
                onFocus={(event) => (lastMainKey.current = event.target.value)}
                onBlur={() => onMainKeyBlurCheck(props.i18n, mainIndex)}
              />
              <button onClick={() => props.createNewNestedKey(item.key)}>
                Add item
              </button>
              <button onClick={() => deleteMainKeyHandler(item.key)}>
                Delete Nested Item
              </button>
            </div>
            {Object.entries(item.values).length > 0 ? (
              <>
                <table>
                  <tr>
                    <th>key</th>
                    <th>en</th>
                    <th>tc</th>
                    <th>Del</th>
                  </tr>
                  {item.values.map((nestedItem, nestedIndex) => {
                    return (
                      <tr>
                        <td>
                          <input
                            type="text"
                            value={nestedItem.key}
                            onChange={(event) =>
                              updateNestedKey(
                                mainIndex,
                                nestedIndex,
                                event.target.value
                              )
                            }
                            onFocus={(event) =>
                              (lastNestedKey.current = event.target.value)
                            }
                            onBlur={() =>
                              onNestedKeyBlurCheck(
                                item.values,
                                mainIndex,
                                nestedIndex
                              )
                            }
                          />
                          <button
                            class="copy-button"
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
                              nestedKeyValueChangeHandler(
                                item.key,
                                nestedItem.key,
                                "en",
                                event.target.value
                              )
                            }
                            onBlur={() =>
                              fillEmptyHandler(
                                item.key,
                                nestedItem.key,
                                nestedItem.en
                              )
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={nestedItem.tc}
                            onChange={(event) =>
                              nestedKeyValueChangeHandler(
                                item.key,
                                nestedItem.key,
                                "tc",
                                event.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              props.deleteNestedKeyValue(
                                item.key,
                                nestedItem.key
                              )
                            }
                          >
                            del
                          </button>
                        </td>
                      </tr>
                    );
                  })}
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

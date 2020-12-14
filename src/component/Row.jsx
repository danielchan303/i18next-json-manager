import * as React from "react";

const Row = props => {
  const deleteMainKeyHandler = (mainKey) => {
    const confirm = prompt("Are you sure to delete? Type 'yes' to confirm");
    if (confirm.toLocaleLowerCase() === 'yes') {
      props.deleteMainKey(mainKey)
    }
  }

  const updateNestedKey = (mainKey, nestedKey, newNestedKey) => {
    props.updateNestedKey(mainKey, nestedKey, newNestedKey);
  }

  const nestedKeyValueChangeHandler = (key, nestedKey, language, value) => {
    props.updateNestedKeyValue({key, nestedKey, language, value});
  };

  const fillEmptyHandler = (key, nestedKey, nestedValue) => {
    if (nestedValue.tc === '') {
       props.updateNestedKeyValue({key, nestedKey, language: 'tc',value: nestedValue.en});
    }
    if (nestedValue.sc === '') {
       props.updateNestedKeyValue({key, nestedKey, language: 'sc',value: nestedValue.en});
    }
  }

  return (
    <>
      {Object.entries(props.i18n).map(([mainKey, mainValue]) => {
        return (
          <>
            <div className="horizontalRow">
              <input 
                type="text"
                value={mainKey}
                onChange={(event) => {
                  props.changeMainKeyName(mainKey, event.target.value)
                }} />
              <button onClick={() => props.createNewNestedKey(mainKey)}>
                Add item
              </button>
              <button onClick={() => deleteMainKeyHandler(mainKey)}>
                Delete Nested Item
              </button>
            </div>
            {Object.entries(mainValue).length > 0 ? (
              <>
                <table>
                  <tr>
                    <th>key</th>
                    <th>en</th>
                    <th>tc</th>
                    <th>Del</th>
                  </tr>
                  {Object.entries(mainValue).map(([nestedKey, nestedValue]) => {
                    return (
                      <tr>
                        <td>
                          <input 
                            type="text" 
                            value={nestedKey}
                            onChange={(event) => updateNestedKey(mainKey, nestedKey, event.target.value)} />
                          <button class="copy-button" data-clipboard-text={`t('${mainKey}.${nestedKey}')`}>Copy</button>
                        </td>
                        <td>
                          <input 
                            type="text" 
                            value={nestedValue.en}
                            onChange={(event) => nestedKeyValueChangeHandler(mainKey, nestedKey, 'en', event.target.value)}
                            onBlur={() => fillEmptyHandler(mainKey, nestedKey, nestedValue)} />
                        </td>
                        <td>
                          <input 
                            type="text" 
                            value={nestedValue.tc}
                            onChange={(event) => nestedKeyValueChangeHandler(mainKey, nestedKey, 'tc', event.target.value)} />
                        </td>
                        <td>
                          <button onClick={() => props.deleteNestedKeyValue(mainKey, nestedKey)}>del</button>
                        </td>
                      </tr>
                    );
                  })}
                </table>
                <br />
              </>
            ): null}
          </>
        );
      })}
    </>
  );
};

export default Row;

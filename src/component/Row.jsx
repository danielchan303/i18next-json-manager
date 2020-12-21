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
      {props.i18n.map((item) => {
        return (
          <>
            <div className="horizontalRow">
              <input 
                type="text"
                value={item.key}
                onChange={(event) => {
                  props.changeMainKeyName(item.key, event.target.value)
                }} />
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
                  {item.values.map((nestedItem) => {
                    return (
                      <tr>
                        <td>
                          <input 
                            type="text" 
                            value={nestedItem.key}
                            onChange={(event) => updateNestedKey(item.key, nestedItem.key, event.target.value)} />
                          <button class="copy-button" data-clipboard-text={`t('${item.key}.${nestedItem.key}')`}>Copy</button>
                        </td>
                        <td>
                          <input 
                            type="text" 
                            value={nestedItem.en}
                            onChange={(event) => nestedKeyValueChangeHandler(item.key, nestedItem.key, 'en', event.target.value)}
                            onBlur={() => fillEmptyHandler(item.key, nestedItem.key, nestedItem.en)} />
                        </td>
                        <td>
                          <input 
                            type="text" 
                            value={nestedItem.tc}
                            onChange={(event) => nestedKeyValueChangeHandler(item.key, nestedItem.key, 'tc', event.target.value)} />
                        </td>
                        <td>
                          <button onClick={() => props.deleteNestedKeyValue(item.key, nestedItem.key)}>del</button>
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

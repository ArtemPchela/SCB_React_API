import React from "react";
import styles from "./style.module.scss";
import useLockBodyScroll from "./LockBodyScroll";
import uuid from "react-uuid";

export default function ModalData({ data, closeHandler, queryState, categoryData }) {
  //-----BLOCK SCROLLING-----//
  useLockBodyScroll();
  //-----BLOCK SCROLLING-----//
  const header = [
    { subtitles: [""], title: "" }
  ];

  const body = [];

  const titles = data.columns.filter((element) => {
    return element.type === "c";
  });

  const subtitles = data.columns.find((element) => {
    return element.type === "t";
  });

  const rowsTitles = data.columns.filter((element) => {
    return element.type === "d";
  });

  const subtitlesValues = queryState[subtitles.code] || [""];

  console.log(subtitlesValues, "subtitlesValues");

  // const testRow = subtitlesValues.map((element, index) => {
  //   return data.data[index]
  // })
  //
  // const dataForRows = subtitlesValues.length;
  let row = [];
  const titlesLength = rowsTitles.length - 1;

  //-----headers-----//
  titles.forEach((title) => {
    const column = { title: title.text, subtitles: [] };
    subtitlesValues.forEach((subtitle) => {
      column.subtitles.push(subtitle.value);
    });
    header.push(column);
  });
  //-----headers-----//

  data.data.forEach((dataElement, dataIndex) => {
    if (!data.data[dataIndex - 1]) {
      Array(titlesLength).fill(null).forEach((element, index) => {
        const titleKey = dataElement.key[index];

        const titleObject = (categoryData.variables.find((element) => {
          return (
            element.code === rowsTitles[index].code
          );
        }));

        const titleNumber = titleObject.values.findIndex((element) => {

          return (
            element === titleKey
          );
        });

        const label = titleObject.valueTexts[titleNumber];

        row.push(label);
        for (let i = 0; i < subtitlesValues.length * titles.length; i++) {
          row.push("");
        }
        body.push(row);
        row = [];
      });
    }
    if (data.data[dataIndex - 1]) {
      const previousObject = data.data[dataIndex - 1];
      const previousKeys = previousObject.key;
      const currentKeys = dataElement.key;
      const notMuchKeys = [];
      currentKeys.forEach((element, index) => {
        if (index < titlesLength && element !== previousKeys[index]) {
          notMuchKeys.push(index);
        }
      });

      notMuchKeys.forEach((index) => {

        const titleKey = dataElement.key[index];

        const titleObject = (categoryData.variables.find((element) => {
          return (
            element.code === rowsTitles[index].code

          );
        }));

        const titleNumber = titleObject.values.findIndex((element) => {
          return (
            element === titleKey
          );
        });
        const label = titleObject.valueTexts[titleNumber];
        row.push(label);
        for (let i = 0; i < subtitlesValues.length * titles.length; i++) {
          row.push("");
        }
        body.push(row);
        row = [];
      });
    }

    const isRowReady = (dataIndex + 1) % subtitlesValues.length === 0;
    dataElement.values.forEach((element, index) => {
      const number = (dataIndex + 1) % subtitlesValues.length;
      const celIndex = subtitlesValues.length * index + (subtitlesValues.length - number);
      row[celIndex] = element;
    });

    if (isRowReady) {
      const titleKey = dataElement.key[rowsTitles.length - 1];
      const titleObject = (categoryData.variables.find((element) => {
        return (
          element.code === rowsTitles[rowsTitles.length - 1].code
        );
      }));
      const titleNumber = titleObject.values.findIndex((element) => {
        return (
          element === titleKey
        );
      });
      const label = titleObject.valueTexts[titleNumber];
      row[0] = label;
      body.push(row);
      row = [];
    }
  });

  return (
    <div className={`${styles.modalWindow_styles}`}>
      <div className={`${styles.table}`}>
        <div className={`${styles.table_wrapper}`}>
          <table className={`${styles.table_class}`}>
            <thead>
            <tr>
              {header.map((element) => {
                return (
                  <th className={`${styles.table_header_first}`}
                      colSpan={element.subtitles.length}
                      key={uuid()}
                  >
                    {element.title}
                  </th>
                );
              })}
            </tr>
            <tr>
              {header.reduce((acc, element) => {
                const subtitles = element.subtitles;
                return [...acc, ...subtitles];
              }, []).map((element) => {
                return (
                  <th
                    className={`${styles.table_header_last}`}
                    key={uuid()}
                  >
                    {element}
                  </th>
                );
              })}
            </tr>
            </thead>
            <tbody>
            {body.map((row) => {
              return (
                <tr>
                  {row.map((text) => {
                    return (
                      <td
                        className={`${styles.table_data_filled}`}
                        key={uuid()}
                      >
                        {text}
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            </tbody>
          </table>
        </div>
      </div>
      {/*-----MODAL BUTTON-----*/}
      <div className={`${styles.button}`}>
        <button
          onClick={closeHandler}
          className={`${styles.button_style}`}
        >
          close
        </button>
      </div>
      {/*-----MODAL BUTTON-----*/}
    </div>
  );
}

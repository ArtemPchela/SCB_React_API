import React, {useEffect, useState} from "react";
import styles from "./style.module.scss";
import Api from "../../services/api";
import InputsFields from "../../Atoms/InputsFields";
import ModalData from "../../Atoms/ModalData";

export default function SearchAPI() {
  const [activeElements, setActiveElements] = useState([true]);
  const [queryState, setQueryState] = useState({});
  const [queryData, setQueryData] = useState({data: null, loading: false, modalOpen: false});
  const [categoryData, setCategoryData] = useState([null]);
  const [level, setLevel] = useState([""]);

  const closeHandler = () => {
    const newQueryData = {...queryData, modalOpen: false}
    setQueryData(newQueryData);
  }

  const onMouseEnter = (index) => {
    const elements = [...activeElements]
    elements[index] = true
    const elementsWidthHiddenInner = elements.map((element, elementIndex) => {
      return elementIndex > index ? false : element
    })
    setActiveElements(elementsWidthHiddenInner)
  }

  const onMouseLeave = (index, e) => {
    if (!e.target || !e.relatedTarget || !e.currentTarget) {
      return false
    }
    if (e.target.contains(e.relatedTarget) || e.target === e.relatedTarget || e.currentTarget.contains(e.relatedTarget)) {
      return false
    }
    const elements = [...activeElements]
    elements[index] = false;
    const elementsWidthHiddenInner = elements.map((element, elementIndex) => {
      return elementIndex > index ? false : element
    })
    setActiveElements(elementsWidthHiddenInner)
  }


  const handleInputChange = (data, code) => {
    const newQueryState = {...queryState, [code]: data}
    setQueryState(newQueryState);
  }

  const concatPath = () => {
    const resultOne = level.filter(element => typeof element === "string");
    const resultTwo = resultOne.map((element) => '/' + element);
    return resultTwo.join("");
  }

  const getQueryData = (method, queryString) => {
    const url = concatPath();
    setQueryData({...queryData, loading: true})
    Api.getCategoryInformation(url, method, queryString).then(result => {
      setQueryData({data: result.data, modalOpen: true, loading: false});

    }).catch(error => {
      setQueryData({...queryData, loading: false})
      return <div>`It appears ${error} that there is a server problem. Try a different request.`</div>
    });
  }

  const handleSubmit = () => {
    //from object to massive
    const queryKeys = Object.keys(queryState);
    const queryArray = queryKeys.map((key) => {
      const queryStateValue = queryState[key];
      return {code: key, selection: {filter: "item", values: queryStateValue.map((el) => el.value)}}
    })
    const queryString = {query: queryArray, response: {format: "json"}}
    const jsonQueryString = JSON.stringify(queryString);
    getQueryData("post", jsonQueryString);
  }

  const concatId = (id, index) => {
    const levelsArrayNewProps = [...level];
    levelsArrayNewProps[index] = id

    setIdInLevel(index, id)
    const result = levelsArrayNewProps.filter(element => typeof element === "string");
    const resultOne = result.filter((element, idx) => idx <= index);
    const resultTwo = resultOne.map((element) => '/' + element);
    return resultTwo.join("")
  }

  const getData = (id, indexLevel, method) => {
    const url = concatId(id, indexLevel)
    Api.getCategoryInformation(url, method).then(result => {
      const categoryDataWithNewProps = [...categoryData];
      categoryDataWithNewProps[indexLevel] = result.data;
      const newCategoryData = categoryDataWithNewProps.map((element, dataIndex) => {
        if (dataIndex > indexLevel) return null;
        return element;
      })
      setCategoryData(newCategoryData);
      const newActiveElements = [...activeElements];
      newActiveElements[indexLevel] = true;
      setActiveElements(newActiveElements);
    })
  }

  const setIdInLevel = (index, id) => {
    const newLevelsWithNewProps = [...level];
    newLevelsWithNewProps[index] = id;
    setLevel(newLevelsWithNewProps)
  }

  useEffect(() => {
    getData("", 0)
  }, []);

  return (
    <>
      <div className={`d-flex ${styles.search}`}>
        {categoryData.filter(Boolean).map((element, index) => index === 0

          ? (<div key={index} className={`${styles.search_first}`}>
            <ul>
              {categoryData[0] ? categoryData[0].map(element =>
                  <li onClick={() => getData(element.id, 1)}
                      key={element.id}
                      className={`${styles.search_header_title}`}
                  >
                    {element.text}
                  </li>)
                : <span className={`${styles.search_header_loading}`}>
                                    Loading ...
                                    </span>}
            </ul>
          </div>)

          : (categoryData[index] && categoryData[index].title)
            ? <div key={element.title}
                   className={`${styles.fixed}`}
                   style={activeElements[index]
                     ? {
                       transform: `translate(${index * 40}px)`,
                       width: `calc(100% - ${(index) * 40 + 100}px)`,
                       transition: `2s ease-in-out`
                     }
                     : {
                       left: `calc(100% - ${(categoryData.length - index) * 40}px)`,
                       width: `calc(100% - ${(index) * 40 + 100}px)`,
                       transition: `2s ease-in-out`
                     }}
                   onMouseOut={(e) => onMouseLeave(index, e)}
                   onMouseEnter={() => onMouseEnter(index)}
            >
              <div className={`${styles.search_title}`}>
                {element.title}
              </div>
              <div className="d-flex flex-column align-items-center ">
                <ul>
                  {element.variables && element.variables.map((element, index) => {
                    return (
                      <div key={index}>
                        <InputsFields element={element}
                                      handleInputChange={handleInputChange}


                        />
                      </div>
                    )
                  })}
                </ul>

                {/*------------submit button----------------------*/}
                <button className={`${styles.searchButton}`}
                        onClick={handleSubmit}
                >
                  Get Data
                </button>
                {/*------------submit button----------------------*/}
              </div>
            </div>

            : (<div key={index}
                    className={`${styles.search_secondHeader} ${styles.fixed}`}
                    style={activeElements[index] ? {
                      transform: `translate(${index * 40}px)`,
                      width: `calc(100% - ${(index) * 40 + 100}px)`,
                      transition: `2s ease-in-out`,
                      overflow: "hidden"
                    } : {
                      left: `calc(100% - ${(categoryData.length - index) * 40}px)`,
                      width: `calc(100% - ${(index) * 40 + 100}px)`,
                      transition: `2s ease-in-out`,
                      overflow: "hidden"
                    }}
                    onMouseOut={(e) => onMouseLeave(index, e)}
                    onMouseEnter={() => onMouseEnter(index)}
            >
              <ul>
                {categoryData[index] ? categoryData[index].map(element => {
                    return (
                      element.type === "l" ?
                        <li onClick={() => getData(element.id, index + 1)} key={element.id}
                            className={`${styles.search_secondHeader_one} ${styles.search_header_title}`}
                        >
                          {element.text}
                        </li>
                        : element.type === "t" ?
                          <li onClick={() => getData(element.id, index + 1, "get")} key={element.text}
                              className={`${styles.search_secondHeader_two} ${styles.search_header_title}`}
                          >
                            {element.text}

                          </li>
                          : <p>{element.title}</p>)
                  }
                ) : ""}
              </ul>
            </div>)
        )}
      </div>
      {queryData.modalOpen && queryData.data && <div className={`${styles.modal}`}>
        <ModalData data={queryData.data}
                   closeHandler={closeHandler}
                   queryState={queryState}
                   categoryData={categoryData[categoryData.length - 1]}
        />
      </div>
      }
    </>
  )
}

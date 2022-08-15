import React from 'react';
import styles from './style.module.scss';
import Select from 'react-select';

export default function InputsFields({element, handleInputChange}) {
  const options = [{}];

  const newOptions = element
    ? element.values.map((value, index) => {
      return {
        value: value,
        label: element.valueTexts[index]
      }
    })
    : options;

  function logChange(value) {
    handleInputChange(value, element.code);
  }

  return (
    <div className={`${styles.inputs}`}>
      <div className={`${styles.inputs_wrapper}`}>
        <div className={`${styles.inputs_wrapper_title}`}>
          {element.text}
        </div>
        <Select
          isMulti
          name="newOptions"
          options={newOptions}
          className={`${styles.select}`}
          classNamePrefix="select"
          onChange={logChange}
        />
      </div>
    </div>
  )
}

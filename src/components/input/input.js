"use client";

import { useEffect, useState } from "react";

import classes from "./input.module.css";

const Input = ({ changeHandler, input }) => {
  const {
    element,
    labelText,
    type = "",
    identifier,
    defaultValue = null,
    options = [],
  } = input;

  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [selectedValue, defaultValue]);

  return (
    <>
      <label htmlFor={identifier}>{labelText}:</label>
      {element === "input" ? (
        <input
          onChange={(e) => changeHandler(e)}
          className={classes["form__input"]}
          id={identifier}
          type={type}
          name={identifier}
          defaultValue={defaultValue}
          required
        />
      ) : (
        <select
          onChange={(e) => changeHandler(e)}
          className={classes["form__input"]}
          id={identifier}
          name={identifier}
          defaultValue={selectedValue}
          required
        >
          <option value="" key="3">
            --Select--
          </option>
          {options.map((option) => (
            <option value={option.id} key={option.id}>
              {option.value}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default Input;

"use client";

import { useFormState } from "react-dom";

import Input from "../input/input";
import classes from "./form.module.css";
import ActionBtn from "../action-btn/action-btn";
import BasicAlerts from "../alert/alert";
import { useEffect } from "react";

const Form = ({
  changeHandler,
  inputs = null,
  action = () => {},
  getId = null,
  id = null,
}) => {
  const [state, formAction] = useFormState(action, { message: null, id: id });

  useEffect(() => {
    if (getId) {
      getId(state.id);
    }
  }, [state, getId]);

  return (
    <>
      <form className={classes["form__container"]} action={formAction}>
        {inputs?.map((input, i) => {
          return (
            <Input
              changeHandler={changeHandler ? changeHandler : () => {}}
              key={i}
              input={input}
            />
          );
        })}
        <ActionBtn />
      </form>
      {state?.message && (
        <BasicAlerts text={state.message} severity={state.severity} />
      )}
    </>
  );
};

export default Form;

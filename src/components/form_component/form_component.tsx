import React, { FC, useRef } from "react";
import { Field, FormProps } from "./form_interface";
import styles from "./form_styles.module.css";

export const FormComponent: FC<FormProps> = ({ values }) => {
  return (
    <div>
      {values.map((v, index) => {
        return <FormField key={v.label + index} v={v} index={index} />;
      })}
    </div>
  );
};

const FormField = ({ v, index }: { v: Field; index: number }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.field}>
      <label>{v.label}</label>
      <input {...v.inputProps} ref={inputRef}></input>
    </div>
  );
};

import React, { useState } from 'react'
import Datepicker from 'react-datepicker'
import { useField } from "formik";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerField({ form, disable, ...props }) {

  const [field, meta] = useField(props.field.name);
  const [input, setInput] = useState(false);
  
  return (
    <div onBlur={field.onBlur}>
      <Datepicker
        dateFormat="MM/dd/yyyy"
        id={props?.id}
        {...field}
        {...props}
        selected={field.value}
        disabled={disable}
        onFocus={()=>setInput(!input)}
        className={"border border-blue-steel rounded-lg px-2 py-1"}
        placeholderText='MM/DD/YEAR'
        onChange={(value) => form.setFieldValue(field.name, new Date(value??""))}
      />
      {/* {meta.error && (
        <div className="flex items-center pt-1 text-red">
          <span className="icon-alert mr-1" />
          <span className="text-sm">{props.errorMessage ? props.errorMessage : meta.error}</span>
        </div>
      )} */}
    </div>
  );
}

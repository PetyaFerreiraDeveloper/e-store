import React from "react";

const FormSelect = ({ title, array, register, callback }) => {
  return (
    <div className="grid grid-cols-[1fr_3fr] gap-3">
      <label htmlFor={title}>{title}</label>
      <select
        className="border-2"
        {...register(title, {required: true})}
        id={title}
        onChange={(e) => {
          e.preventDefault();
          callback(e.target.value);
        }}
      >
        {array.map((obj) => {
          return (
            <option value={obj.code} key={obj.code}>
              {obj.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;

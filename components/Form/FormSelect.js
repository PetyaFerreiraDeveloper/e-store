import React from "react";

const FormSelect = ({ title, array, register }) => {
  return (
    <div>
      <label htmlFor={title}>{title}</label>
      <select {...register(title)} id={title}>
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

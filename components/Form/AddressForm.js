import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";

const addressParams = [
  { name: "firstName", type: "text" },
  { name: "lastName", type: "text" },
  { name: "address1", type: "text" },
  { name: "email", type: "email" },
  { name: "city", type: "text" },
  { name: "zip", type: "number" },
];

const AddressForm = ({ checkoutToken }) => {
  const {handleSubmit, register, setValue} = useForm();
  return (
    <form>
      {addressParams.map((param) => {
        return <FormInput param={param} register={register} />;
      })}
    </form>
  );
};

export default AddressForm;

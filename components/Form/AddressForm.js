import React from "react";
import { useForm } from "react-hook-form";
import CountrySelect from "./CountrySelect";
import FormInput from "./FormInput";

const addressParams = [
  { name: "firstName", type: "text" },
  { name: "lastName", type: "text" },
  { name: "address1", type: "text" },
  { name: "email", type: "email" },
  { name: "city", type: "text" },
  { name: "zip", type: "number" },
];

const AddressForm = ({ checkoutToken, setShippingData }) => {
  const { handleSubmit, register, setValue } = useForm();

  const submitData = (data) => {
    setShippingData(data);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitData)} className="flex flex-col gap-3">
      {addressParams.map((param) => {
        return <FormInput param={param} register={register} key={param.name} />;
      })}

      <CountrySelect checkoutToken={checkoutToken} register={register} />

      <button type="submit" >Next</button>
    </form>
  );
};

export default AddressForm;

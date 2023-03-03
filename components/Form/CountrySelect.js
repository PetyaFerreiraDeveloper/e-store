import React, { useState, useEffect } from "react";
import { set } from "react-hook-form";
import commerce from "../../lib/commerce";
import FormSelect from "./FormSelect";

const CountrySelect = ({ checkoutToken, register }) => {
  const [countries, setCountries] = useState([]);
  const [subDivisions, setSubDivisions] = useState([]);
  const [shippingOptions, setShippingOptions] = useState([]);

  useEffect(() => {
    async function getData() {
      if (checkoutToken) {
        try {
          const res = await commerce.services.localeListShippingCountries(
            checkoutToken.id
          );
          let countriesArray = Object.keys(res.countries).map((key) => {
            return { code: key, name: res.countries[key] };
          });
          setCountries(countriesArray);
        } catch (error) {
          console.error(error);
        }
      }
    }

    getData();
  }, []);

  return <FormSelect title="countries" array={countries} register={register} />;
};

export default CountrySelect;

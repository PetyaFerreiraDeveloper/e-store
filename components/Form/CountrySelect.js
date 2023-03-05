import React, { useState, useEffect } from "react";
import { set } from "react-hook-form";
import commerce from "../../lib/commerce";
import FormSelect from "./FormSelect";

const CountrySelect = ({ checkoutToken, register }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [subdivisions, setSubdivisions] = useState([]);
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
          setSelectedCountry(countriesArray[0].code);
        } catch (error) {
          console.error(error);
        }
      }
    }

    getData();
  }, []);

  useEffect(() => {
    async function getSubdivisions() {
      if (selectedCountry) {
        await commerce.services.localeListShippingSubdivisions(
          checkoutToken.id,
          selectedCountry
        )
            .then(res => console.log(res))
            .catch(err=>console.error(err))
      }
    }

    getSubdivisions();
  },[selectedCountry]);

  return (
    <FormSelect
      title="country"
      array={countries}
      register={register}
      callback={setSelectedCountry}
    />
  );
};

export default CountrySelect;

import React, { useState, useEffect } from "react";
import { set } from "react-hook-form";
import commerce from "../../lib/commerce";
import FormSelect from "./FormSelect";

const CountrySelect = ({ checkoutToken, register, setValue, setDisabled }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [subdivisions, setSubdivisions] = useState([]);
  const [selectedSubdivision, setSelectedSubdivision] = useState();
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState();

  useEffect(() => {
    async function getCountries() {
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
          setValue("country", countriesArray[0].code);
        } catch (error) {
          console.error(error);
        }
      }
    }

    getCountries();
  }, []);

  useEffect(() => {
    setDisabled(true);
    setLoading("subdivisions");

    async function getSubdivisions() {
      if (selectedCountry) {
        await commerce.services
          .localeListShippingSubdivisions(checkoutToken.id, selectedCountry)
          .then((res) => {
            let subdivisionsArray = Object.keys(res.subdivisions).map((key) => {
              return { code: key, name: res.subdivisions[key] };
            });
            setSubdivisions(subdivisionsArray);
            setSelectedSubdivision(subdivisionsArray[0].code);
            setValue("subdivision", subdivisionsArray[0].code);
          })
          // .then(res => console.log(res))
          .catch((err) => console.error(err));
      }
    }

    getSubdivisions();
  }, [selectedCountry]);

  useEffect(() => {
    setDisabled(true);

    setLoading("true");
    async function getShipping() {
      if (selectedSubdivision) {
        await commerce.checkout
          .getShippingOptions(checkoutToken.id, {
            country: selectedCountry,
            region: selectedSubdivision,
          })
          .then((res) => {
            let shippingOptionsArray = res.map((elem) => {
              return {
                code: elem.id,
                name: `${elem.description}-${elem.price.formatted_with_symbol}`,
              };
            });
            setShippingOptions(shippingOptionsArray);
            setSelectedShippingOption(shippingOptionsArray[0].code);
            setValue("shipping-options", shippingOptionsArray[0].code);
          })
          .catch((err) => console.error(err));

        setInitialLoading(false);
        setLoading('');
        setDisabled(false);
      }
    }
    getShipping();
  }, [selectedSubdivision]);

  if (initialLoading)
    return (
      <span>Fetching countries, subdivisions and shipping options... </span>
    );

    console.log(shippingOptions);

  return (
    <>
      <FormSelect
        title="country"
        array={countries}
        register={register}
        callback={setSelectedCountry}
      />
      {loading === "subdivisions" ? (
        <p>fetching subdivisions</p>
      ) : (
        <FormSelect
          title="subdivision"
          array={subdivisions}
          register={register}
          callback={setSelectedSubdivision}
        />
      )}
      {loading.length > 0 ? (
        <p>fetching shipping options</p>
      ) : (
        <FormSelect
          title="shipping-options"
          array={shippingOptions}
          register={register}
          callback={setSelectedShippingOption}
        />
      )}
    </>
  );
};

export default CountrySelect;

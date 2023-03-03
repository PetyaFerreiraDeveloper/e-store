import AddressForm from "../components/Form/AddressForm";
import Payment from "../components/Payment/Payment";
import React, { useEffect, useState } from "react";
import commerce from "../lib/commerce";

const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState();
  const [shippingData, setShippingData] = useState();

  useEffect(() => {
    async function getToken() {
      if (Object.keys(cart).length !== 0) {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });
          setCheckoutToken(token);
        } catch (error) {
          console.error('error');
        }
      }
    }

    getToken();
  }, [cart]);

  const steps = [
    <AddressForm
      setShippingData={(data) => {
        setShippingData(data);
        nextStep();
      }}
      checkoutToken={checkoutToken}
    />,
    <Payment shippingData={shippingData} checkoutToken={checkoutToken} />,
  ];

  const nextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <div className="flex justify-center">
      {checkoutToken ? (
        <>

          {steps[activeStep]}

          <div className="flex gap-3">
            {activeStep > 0 && (
              <button
                onClick={prevStep}
                className="px-8 py-2 bg-gray-300 rounded"
              >
                &lt; Back
              </button>
            )}
            {/* {activeStep < steps.length - 1 && (
            <button onClick={nextStep} className="px-8 py-2 bg-gray-300 rounded">
              Next &gt;
            </button>
          )} */}
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Checkout;

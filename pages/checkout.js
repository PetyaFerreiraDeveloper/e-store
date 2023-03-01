import React, { useState } from "react";

const Step1 = () => {
  return <div>step 1</div>;
};
const Step2 = () => {
  return <div>step 2</div>;
};
const Step3 = () => {
  return <div>step 3</div>;
};

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [<Step1 />, <Step2 />, <Step3 />];

  const nextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <div>
      <h3>Step {activeStep + 1} </h3>
      {steps[activeStep]}

      <div className="flex gap-3">
        {activeStep > 0 && (
          <button onClick={prevStep} className="px-8 py-2 bg-gray-300 rounded">
            &lt; Back
          </button>
        )}
        {activeStep < steps.length - 1 && (
          <button onClick={nextStep} className="px-8 py-2 bg-gray-300 rounded">
            Next &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;

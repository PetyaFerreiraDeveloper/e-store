import commerce from "../../lib/commerce";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import FormInput from "../Form/FormInput";

const Payment = ({ checkoutToken, shippingData, refreshCart }) => {
  const { handleSubmit, register } = useForm();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState();
  const [error, setError] = useState();

  const shippingCharges = checkoutToken.shipping_methods.find(
    (obj) => obj.id === shippingData["shipping-options"]
  );

  async function payNow(cardData) {
    setLoading(true);
    setError();
    const orderDetails = {
      line_items: checkoutToken.line_items,
      customer: {
        email: shippingData.email,
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
      },
      shipping: {
        name: "Primary",
        street: shippingData.address,
        town_city: shippingData.city,
        country_state: shippingData.subdivision,
        postal_zip_code: shippingData.zip,
        country: shippingData.country,
      },
      fulfillment: {
        shipping_method: shippingData["shipping-options"],
      },
    };

    await commerce.checkout
      .capture(checkoutToken.id, {
        ...orderDetails,
        payment: {
          gateway: "test_gateway",
          card: {
            number: cardData.Number,
            expiry_month: cardData.Expiry_Month,
            expiry_year: cardData.Expiry_Year,
            cvc: cardData.CVC,
            postal_zip_code: cardData.Postal_ZIP_Code,
          },
        },
      })
      .then((res) => {
        setOrder(res);
        refreshCart();
        setLoading(false);
      })
      .catch(({ data }) => {
        setError(data.error.message);
        setLoading(false);
      });
  }

  return (
    <div>
      {order ? (
        <div className="flex flex-col">
          <span>Thanks for your order!</span>
          <span>
            {order.customer.firstname} {order.customer.lastname}
          </span>
          <span>Total Payment: {order.order_value.formatted_with_symbol}</span>
          <small>Your order reference: {order.customer_reference} </small>
        </div>
      ) : (
        <>
          <h3 className="font-bold">
            {shippingData.firstName} {shippingData.lastName}
          </h3>

          <p>Address: {shippingData.address}</p>
          <p>Email: {shippingData.email}</p>
          <p data-testid="ct" >City: {shippingData.city}</p>
          <p>Postal Code: {shippingData.zip}</p>
          <p>Country code: {shippingData.country}</p>
          <p>Subdivision Code: {shippingData.subdivision}</p>

          <h4 className="font-bold">Items you are buying:</h4>

          <ul>
            {checkoutToken.line_items.map((item) => {
              return (
                <li key={item.product_name}>
                  {item.product_name} - {item.line_total.formatted_with_symbol}{" "}
                  (Quantity: {item.quantity}){" "}
                </li>
              );
            })}
          </ul>

          <p data-testid="total">
            Total: {checkoutToken.total.formatted_with_symbol} + {shippingCharges.price?.formatted_with_symbol} (Shipping charges)
          </p>

          {error && <h3>Error: {error}</h3>}
          {loading ? (
            <p>Wait while we process your data</p>
          ) : (
            <form onSubmit={handleSubmit(payNow)}>
              <FormInput
                param={{
                  name: "Number",
                  type: "number",
                }}
                register={register}
              />
              <FormInput
                param={{
                  name: "Expiry_Month",
                  type: "number",
                }}
                register={register}
              />
              <FormInput
                param={{
                  name: "Expiry_Year",
                  type: "number",
                }}
                register={register}
              />
              <FormInput
                param={{
                  name: "CVC",
                  type: "number",
                }}
                register={register}
              />
              <FormInput
                param={{
                  name: "Postal_ZIP_Code",
                  type: "number",
                }}
                register={register}
              />
              <button type="submit">Pay Now</button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default Payment;

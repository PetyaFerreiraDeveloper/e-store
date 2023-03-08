import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Payment from "./Payment";
import { mock_checkout_token } from "../../__mocks__/mockData";

import server from "../../__mocks__/server/server";

beforeAll(() => server.listen({
    onUnhandledRequest(req) {
        if(req.url.href !== 'https://api.chec.io/v1/carts') {
            console.warn(`Found a ${req.method} request to ${req.url.href}`)
        }
    }
}));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Payment", () => {
  it("renders the shipping data correctly", () => {
    render(
      <Payment
        checkoutToken={mock_checkout_token}
        shippingData={{
          lastName: "Doe",
          city: "Delhi",
          email: "abc@gmail.com",
          address: "123 Dream street, New Delhi",
          zip: "12345",
          country: "AD",
          subdivision: "07",
          firstName: "John",
          "shipping-options": "ship_bWZ3l8WLO5kpEQ",
        }}
        refreshCart={jest.fn()}
      />
    );

    screen.getByText(/John Doe/i);
    screen.getByText(/Address: 123 Dream street, New Delhi/i);
    screen.getByText(/Email: abc@gmail.com/i);
    screen.getByText(/City: Delhi/i);
    screen.getByText(/Postal Code: 12345/i);
    screen.getByText(/Country code: AD/i);
    screen.getByText(/Subdivision Code: 07/i);

    expect(screen.getAllByRole("spinbutton").length).toBe(5);

    screen.getByText("Total: kr384.00 + kr100.00 (Shipping charges)");
    // expect(screen.getByTestId('total')).toHaveTextContent("Total: kr384.00 + kr100.00 (Shipping charges)");

    expect(screen.getAllByRole("listitem").length).toBe(2);
  });

  it("renders loading when we submit our form", async () => {
    render(
      <Payment
        checkoutToken={mock_checkout_token}
        shippingData={{
          lastName: "Doe",
          city: "Delhi",
          email: "abc@gmail.com",
          address: "123 Dream street, New Delhi",
          zip: "12345",
          country: "AD",
          subdivision: "07",
          firstName: "John",
          "shipping-options": "ship_bWZ3l8WLO5kpEQ",
        }}
        refreshCart={jest.fn()}
      />
    );

    const user = userEvent.setup();

    await user.type(
      screen.getByRole("spinbutton", { name: "Number" }),
      "4242424242424242"
    );
    await user.type(
      screen.getByRole("spinbutton", { name: "Expiry_Month" }),
      "12"
    );
    await user.type(
      screen.getByRole("spinbutton", { name: "Expiry_Year" }),
      "24"
    );
    await user.type(screen.getByRole("spinbutton", { name: "CVC" }), "123");
    await user.type(
      screen.getByRole("spinbutton", { name: "Postal_ZIP_Code" }),
      "12345"
    );

    user.click(screen.getByRole("button", { name: "Pay Now" }));
    // await screen.findByText(/Wait while we process your data/i)
    await screen.findByText(/Thanks for your order!/i);
    await screen.findByText(/John Doe/i);
    await screen.findByText(/Your order reference: BHKB_1234/i);
    await screen.findByText(/Total Payment: kr384.00/i);
  });

  it("renders thanks message when we submit our payment info correctly", async () => {
    render(
      <Payment
        checkoutToken={mock_checkout_token}
        shippingData={{
          lastName: "Doe",
          city: "Delhi",
          email: "abc@gmail.com",
          address: "123 Dream street, New Delhi",
          zip: "12345",
          country: "AD",
          subdivision: "07",
          firstName: "John",
          "shipping-options": "ship_bWZ3l8WLO5kpEQ",
        }}
        refreshCart={jest.fn()}
      />
    );

    const user = userEvent.setup();

    await user.type(
      screen.getByRole("spinbutton", { name: "Number" }),
      "4242424242424242"
    );
    await user.type(
      screen.getByRole("spinbutton", { name: "Expiry_Month" }),
      "12"
    );
    await user.type(
      screen.getByRole("spinbutton", { name: "Expiry_Year" }),
      "24"
    );
    await user.type(screen.getByRole("spinbutton", { name: "CVC" }), "123");
    await user.type(
      screen.getByRole("spinbutton", { name: "Postal_ZIP_Code" }),
      "12345"
    );

    user.click(screen.getByRole("button", { name: "Pay Now" }));
    // await screen.findByText(/Wait while we process your data/i)
    await screen.findByText(/Thanks for your order!/i);
    await screen.findByText(/John Doe/i);
    await screen.findByText(/Your order reference: BHKB_1234/i);
    await screen.findByText(/Total Payment: kr384.00/i);
  });

  it("renders error message when we submit our payment info incorrectly", async () => {
    render(
      <Payment
        checkoutToken={mock_checkout_token}
        shippingData={{
          lastName: "Doe",
          city: "Delhi",
          email: "abc@gmail.com",
          address: "123 Dream street, New Delhi",
          zip: "12345",
          country: "AD",
          subdivision: "07",
          firstName: "John",
          "shipping-options": "ship_bWZ3l8WLO5kpEQ",
        }}
        refreshCart={jest.fn()}
      />
    );

    const user = userEvent.setup();

    await user.type(
      screen.getByRole("spinbutton", { name: "Number" }),
      "4242424242424241"
    );
    await user.type(
      screen.getByRole("spinbutton", { name: "Expiry_Month" }),
      "12"
    );
    await user.type(
      screen.getByRole("spinbutton", { name: "Expiry_Year" }),
      "24"
    );
    await user.type(screen.getByRole("spinbutton", { name: "CVC" }), "123");
    await user.type(
      screen.getByRole("spinbutton", { name: "Postal_ZIP_Code" }),
      "12345"
    );

    user.click(screen.getByRole("button", { name: "Pay Now" }));
    // await screen.findByText(/Wait while we process your data/i)
    await screen.findByText(/Error/i);
   
  });
});

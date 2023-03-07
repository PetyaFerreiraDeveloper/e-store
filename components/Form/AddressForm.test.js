import React from "react";

import {
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import server from "../../__mocks__/server/server";
import AddressForm from "./AddressForm";
import CountrySelect from "./CountrySelect";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("address form", () => {
  it("renders the input fields correctly", async () => {
    render(
      <AddressForm
        checkoutToken={{
          id: "chkt_QG375vgMmQlrMO",
          cart_id: "cart_12345",
        }}
        setShippingData={jest.fn()}
      />
    );

    screen.getByRole("textbox", { name: /firstName/i });
    screen.getByRole("textbox", { name: /lastName/i });
    screen.getByRole("textbox", { name: /city/i });
    screen.getByRole("textbox", { name: /address/i });
    screen.getByRole("textbox", { name: /email/i });
    screen.getByRole("spinbutton", { name: /zip/i });

    await screen.findByRole("combobox", { name: /country/i });
    await screen.findByRole("combobox", { name: /subdivision/i });
    await screen.findByRole("combobox", { name: /shipping-options/i });
  });

  it("country select works correctly", async () => {
    render(
      <CountrySelect
        checkoutToken={{
          id: "chkt_QG375vgMmQlrMO",
          cart_id: "cart_12345",
        }}
        setDisabled={jest.fn()}
        setValue={jest.fn()}
        register={jest.fn()}
      />
    );

    let countrySelect = await screen.findByRole("combobox", {
      name: /country/i,
    });
    let subdivisionSelect = await screen.findByRole("combobox", {
      name: /subdivision/i,
    });
    let shippingSelect = await screen.findByRole("combobox", {
      name: /shipping-options/i,
    });

    expect(countrySelect).toHaveValue("AD");
    expect(subdivisionSelect).toHaveValue("07");
    screen.getByText(/EU-kr100.00/i);
    expect(shippingSelect).toHaveValue("ship_bWZ3l8WLO5kpEQ");

    const user = userEvent.setup();

    await user.selectOptions(countrySelect, "US");
    subdivisionSelect = await screen.getByRole("combobox", {
      name: /subdivision/i,
    });
    shippingSelect = await screen.findByRole("combobox", {
      name: /shipping-options/i,
    });

    expect(subdivisionSelect).toHaveValue("AL");
    screen.getByText(/Domestic-kr0.00/i);
  });

  it("renders the form fields correctly", async () => {
    const shippingData=jest.fn();
    render(
      <AddressForm
        checkoutToken={{
          id: "chkt_QG375vgMmQlrMO",
          cart_id: "cart_12345",
        }}
        setShippingData={shippingData}
      />
    );

    const firstName = screen.getByRole("textbox", { name: /firstName/i });
    const lastName = screen.getByRole("textbox", { name: /lastName/i });
    const city = screen.getByRole("textbox", { name: /city/i });
    const address = screen.getByRole("textbox", { name: /address/i });
    const email = screen.getByRole("textbox", { name: /email/i });
    const zip = screen.getByRole("spinbutton", { name: /zip/i });

    const country = await screen.findByRole("combobox", { name: /country/i });
    

    const user = userEvent.setup();

    await user.type(firstName, 'John');
    await user.type(lastName, 'Doe');
    await user.type(city, 'Delhi');
    await user.type(email, 'abc@gmail.com');
    await user.type(address, '123 Dream street, New Delhi');
    await user.type(zip, '12345');
    await user.type(country, 'AD');

    const subdivision = await screen.findByRole("combobox", { name: /subdivision/i });
    await user.type(subdivision, '07');
    await screen.findByRole("combobox", { name: /shipping-options/i });

    await user.click(screen.getByRole('button', {name: /Next/i}))

    expect(shippingData).toBeCalled();
    expect(shippingData).toBeCalledWith({
        lastName: 'Doe',
        city: 'Delhi',
        email: 'abc@gmail.com',
        address: '123 Dream street, New Delhi',
        zip: '12345',
        country: 'AD',
        subdivision: '07',
        firstName: 'John',
        'shipping-options': 'ship_bWZ3l8WLO5kpEQ'
    });

  });
});

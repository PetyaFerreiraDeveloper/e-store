import React from "react";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import server from "../../__mocks__/server/server";
import AddressForm from "./AddressForm";
import CountrySelect from "./CountrySelect";

beforeAll(() => server.listen());

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

    let countrySelect =  await screen.findByRole("combobox", { name: /country/i });
    let subdivisionSelect = await screen.findByRole('combobox', {name: /subdivision/i});
    let shippingSelect = await screen.findByRole("combobox", { name: /shipping-options/i });

    expect(countrySelect).toHaveValue('AN');
    expect(subdivisionSelect).toHaveValue('07');
    screen.getByText(/EU-kr100.00/i)
    expect(shippingSelect).toHaveValue('ship_bWZ3l8WLO5kpEQ');

    const user = userEvent.setup();

    await user.selectOptions(countrySelect, 'AU');
    screen.getByText('Austria')
    subdivisionSelect = screen.getByRole('combobox', {name: /subdivision/i});

    expect(subdivisionSelect).toHaveValue('1');

  });
});

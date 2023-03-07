import React from "react";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddressForm from "./AddressForm";

describe("address form",  () => {
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

    screen.getByRole('textbox', {name:/firstName/i });
    screen.getByRole('textbox', {name:/lastName/i });
    screen.getByRole('textbox', {name:/city/i });
    screen.getByRole('textbox', {name:/address/i });
    screen.getByRole('textbox', {name:/email/i });
    screen.getByRole('spinbutton', {name:/zip/i });

    await screen.findByRole('combobox', {name:/country/i });
    await screen.findByRole('combobox', {name:/subdivision/i });
    await screen.findByRole('combobox', {name:/shipping-options/i });


  });
});

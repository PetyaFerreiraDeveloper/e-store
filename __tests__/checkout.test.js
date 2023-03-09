import React from "react";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Checkout from "../pages/checkout";
import { mockCart } from "../__mocks__/mockData";
import server from "../__mocks__/server/server";

beforeAll(() =>
  server.listen({
    onUnhandledRequest(req) {
      if (req.url.href !== "https://api.chec.io/v1/carts") {
        console.log(
          "Found an unhandled request to s",
          req.method,
          req.url.href
        );
      }
    },
  })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("checkout flow", () => {
  it("integration test", async () => {
    render(<Checkout cart={mockCart} refreshCart={jest.fn()} />);

    const firstName = await screen.findByRole("textbox", {
      name: /firstName/i,
    });
    const lastName = await screen.findByRole("textbox", { name: /lastName/i });
    const city = await screen.findByRole("textbox", { name: /city/i });
    const email = await screen.findByRole("textbox", { name: /email/i });
    const address = await screen.findByRole("textbox", { name: /address/i });
    const zip = await screen.findByRole("spinbutton", { name: /zip/i });

    // screen.getByText(/Fetching countries, subdivisions and shipping options.../i);

    await screen.findByRole("combobox", { name: /country/i });
    
  });
});

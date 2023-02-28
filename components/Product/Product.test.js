import React from "react";
import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Product from "./Product";
import { mockProduct } from "../../__mocks__/mockProduct";

describe('Product Component',  () => {
    it('Renders product correctly',async () => {
        const addToCart = jest.fn();
        render(<Product product={mockProduct} addToCart={addToCart}/>);
        screen.getByText(/Monitor/i);
        screen.getByText(/kr850/i);
        const addToCartBtn = screen.getByRole('button', {name: /Add to cart/i} );

        await userEvent.click(addToCartBtn);
        expect(addToCart).toBeCalled();
    });
});
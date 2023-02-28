import React from "react";
import { render, screen} from "@testing-library/react";

import Product from "./Product";
import { mockProduct } from "../../__mocks__/mockProduct";

describe('Product Component', () => {
    it('Renders product correctly', () => {
        render(<Product product={mockProduct} />);
        screen.getByText(/Monitor/i);
        screen.getByText(/e1234/i);
        screen.getByText(/kr850/i);
        screen.getByRole('button', {name: /Add to cart/i} );
    });
});
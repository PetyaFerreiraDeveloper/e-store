import React from "react";
import { render, screen} from "@testing-library/react";

import Navbar from "./Navbar";
import { mockCart } from "../../__mocks__/mockData";

jest.mock('next/router', () => ({
    useRouter(){
        return {
            route: '/',
            pathname: '',
            query: '',
            asPath: '/',
            push: jest.fn()
        }
    }
}))

describe('Navigation component', () => {
    it('renders navigation correctly', () => {
        render(<Navbar cart={mockCart} />);
        screen.getByRole('link', {name: /Home/i });
        screen.getByRole('link', {name: /Cart/i });
    });

    it('renders cart items count', () => {
        render(<Navbar cart={mockCart} /> );
        screen.getByText(/Cart 2/i)
    })
});

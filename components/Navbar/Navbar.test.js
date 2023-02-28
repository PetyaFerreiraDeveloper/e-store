import React from "react";

import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Navbar from "./Navbar";

describe('Navigation component', () => {
    it('renders navigation correctly', () => {
        render(<Navbar />);
        screen.getByRole('link', {name: /Home/i });
        screen.getByRole('link', {name: /Cart/i });
    })
});

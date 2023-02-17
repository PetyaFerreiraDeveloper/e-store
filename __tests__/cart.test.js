import React from 'react';
import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CartDetail from '../pages/cart';
import { mockCart } from '../__mocks__/mockData';
import { list } from 'postcss';

describe('Cart details page', () => {
    it('render total cart price', () => {
        render(<CartDetail cart={mockCart} updateQuantity={jest.fn()} emptyCart={jest.fn()} />);
        screen.getByText(/Cart Total Price: kr384.00/i);
        const line_items = screen.getByRole('list', {name:/cart items/i});
        const {getAllByRole}=within(line_items);
        const listItems =getAllByRole('listitem');
        expect(listItems.length).toBe(2);
    })
})
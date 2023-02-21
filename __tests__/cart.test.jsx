import React from 'react';
import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CartDetail from '../pages/cart';
import { mockCart } from '../__mocks__/mockData';

describe('Cart details page', () => {
    it('render total cart price', () => {
        render(<CartDetail cart={mockCart} updateQuantity={jest.fn()} emptyCart={jest.fn()} />);
        screen.getByText(/Cart Total Price: kr684.00/i);
        const line_items = screen.getByRole('list', {name:/cart items/i});
        const {getAllByRole}=within(line_items);
        const listItems =getAllByRole('listitem');
        expect(listItems.length).toBe(2);
    })

    it('renders message if cart is empty', () => {
        const zeroItemsCart = {
            id: "cart_NqKE50nrdLwdgB",
            created: 1676548468,
            updated: 1676626175,
            expires: 1679218175,
            total_items: 2,
            total_unique_items: 2,
            subtotal: {
              raw: 0,
              formatted: "0",
              formatted_with_symbol: "kr0",
              formatted_with_code: "0 DKK",
            },
            hosted_checkout_url: "https://checkout.chec.io/cart/cart_NqKE50nrdLwdgB",
            meta: null,
            line_items: [],
            currency: {
              code: "DKK",
              symbol: "kr",
            },
            discount: [],
          }
        render(<CartDetail cart={zeroItemsCart} updateQuantity={jest.fn()} emptyCart={jest.fn()} />)
        screen.getByText(/Please Buy Something/i)
    });

    it('renders loading if cart is undefined', () => {
      render(<CartDetail cart={{}} updateQuantity={jest.fn()} emptyCart={jest.fn()} />)
      screen.getByText(/Loading.../i)
    });

    it('renders line items properly', () => {
      render(<CartDetail cart={mockCart} updateQuantity={jest.fn()} emptyCart={jest.fn()} />);
      screen.getByText(/kr150.00 X 3 = kr450.00/i)
      screen.getByText(/kr234.00 X 1 = kr234.00/i)
      // screen.getByText(/kr150x3=kr450/i);
      // screen.getByText(/kr234x1=kr234/i);
    })
})
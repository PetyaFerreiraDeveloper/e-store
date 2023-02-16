import React from "react";

import Home from "../pages/index";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { mockProducts } from "../__mocks__/mockProduct";
import { mockCategories } from "../__mocks__/mockData";

describe("Home Page", () => {
  it("render all products heading", () => {
    render(<Home products={[mockProducts]} categories={[]} />);
    screen.getByRole("heading", { name: /all products/i });
  });

  it("renders accessible search box", () => {
    render(<Home products={mockProducts} categories={[]} />);
    const searchInput = screen.getByRole("searchbox");
    expect(searchInput).toHaveAccessibleName("Search");
  });

  it("renders all products", () => {
    render(<Home products={mockProducts} categories={[]} />);

    const allProducts = screen.getByRole("list", { name: /products/i });
    const { getAllByRole } = within(allProducts);
    const listItems = getAllByRole("listitem");
    expect(listItems.length).toBe(3);
  });

  it("renders all categories", () => {
    render(<Home products={mockProducts} categories={mockCategories} />);
    const allCategories = screen.getByRole("list", { name: /categories/i });
    const { getAllByRole } = within(allCategories);
    const listItems = getAllByRole('listitem', {name: /category/i });
    expect(listItems.length).toBe(2);
  });

  // example of testing for one product per category

  // it('renders 1 product per category', () => {
  //     render(<Home products={mockProducts} categories={mockCategories} />);
  //     const categoryList = screen.getByRole('list', {name: /Mouse/i});
  //     const {getAllByRole} = within(categoryList);
  //     const listItems = getAllByRole('listitem');
  //     expect(listItems.length).toBe(1);
  // });

    it("shows only search results when search term is not empty", async () => {
      render(<Home products={mockProducts} categories={mockCategories} />);
      const searchBox = screen.getByPlaceholderText(/Search products/i);
      const user = userEvent.setup();
      await user.type(searchBox, "mo");

      const searchResults = screen.getByRole("list", { name: /search results/i });

      expect(searchResults).toBeVisible();

      const { getAllByRole } = within(searchResults);
      const listitems = getAllByRole("listitem");
      expect(listitems.length).toBe(2);

      const allproducts = screen.queryByRole("list", { name: /products/i });
      expect(allproducts).toBeNull();
    });
});

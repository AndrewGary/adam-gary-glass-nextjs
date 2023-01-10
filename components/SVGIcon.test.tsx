import React from "react";
import { screen, render } from "@testing-library/react";
import SVGIcon from "./SVGIcon";
import "@testing-library/jest-dom";

describe("SVGIcon Unit Test", () => {
	it("Renders Correctly", () => {
		render(<SVGIcon type="hamburgerMenu" />);
	});

	it("Renders the hamburger menu icon when type is set to hamburgerMenu", () => {
		render(<SVGIcon type="hamburgerMenu" />);

		const hamburgerMenuIconTest = screen.getByTestId("hamburgerMenuIcon");

		expect(hamburgerMenuIconTest).toBeVisible();
	});

	it("Renders the shopping cart icon when type is set to shoppingCart", () => {
		render(<SVGIcon type="shoppingCart" />);

		const shoppingCartIconTest = screen.getByTestId("shppingCartIcon");

		expect(shoppingCartIconTest).toBeVisible();
	});

	it("Renders the search icon when type is set to searchIcon", () => {
		render(<SVGIcon type="searchIcon" />);

		const searchIconTest = screen.getByTestId("searchIcon");

		expect(searchIconTest).toBeVisible();
	});
});

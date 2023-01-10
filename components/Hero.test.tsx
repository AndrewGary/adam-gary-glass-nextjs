import React from "react";
import Hero from "./Hero";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Hero unit tests", () => {
	it("Should render correctly", () => {
		render(<Hero />);
	});

	it("Should display the correct text", () => {
		render(<Hero />);

		const heading1Text = screen.getByText("Hand Crafted Glass Art");
		const heading2Text = screen.getByText("Made In Colorado");

		expect(heading1Text).toBeTruthy();
		expect(heading2Text).toBeTruthy();
	});

	it("Should display a button that says All Products", () => {
		render(<Hero />);

		const buttonText = screen.getByText("All Products");

		expect(buttonText).toBeTruthy();
	});

	it("The button should link to the /Products page", () => {
		render(<Hero />);

		const buttonText = screen.getByText("All Products");

		expect(buttonText.getAttribute('href')).toEqual('/Products');
	});
});

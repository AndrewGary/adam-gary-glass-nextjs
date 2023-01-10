import React from "react";
import OfAgeSplashPage from "./OfAgeSplashPage";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("OfAgeSplashPage Unit Tests", () => {
	const mockSetOver21 = jest.fn();

	it("Should render correctly", () => {
		render(<OfAgeSplashPage setOver21={mockSetOver21} />);
	});

	it("Should ask the user if they are over the age of 21", () => {
		render(<OfAgeSplashPage setOver21={mockSetOver21} />);

		const askOfAgeText = screen.getByText("Are You over the age of 21?");

		expect(askOfAgeText).toBeTruthy();
	});

	it("Should render 2 buttons, one confirming they are 21 or over and one that confirms they are under 21", () => {
		render(<OfAgeSplashPage setOver21={mockSetOver21} />);

		const ofAgeButton = screen.getByText("Yes");
		const notOfAgeButton = screen.getByText("No");

		expect(ofAgeButton).toBeTruthy();
		expect(notOfAgeButton).toBeTruthy();
	});

	it("setOver21 should be called when the button confirming user is over 21 is clicked", () => {
		render(<OfAgeSplashPage setOver21={mockSetOver21} />);

		const ofAgeButton = screen.getByText("Yes");

		fireEvent.click(ofAgeButton);

		expect(mockSetOver21).toHaveBeenCalled();
	});
});

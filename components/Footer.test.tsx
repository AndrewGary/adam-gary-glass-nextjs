import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Unit Tests", () => {
	it("Renders Properly", () => {
		render(<Footer />);
	});

	it("Renders the correct Links", () => {
		const component = render(<Footer />);

		const contactLink = component.getByText("Contact");

		const wholeSaleLink = component.getByText("Wholesale");
		const purchasePolicyLink = component.getByText("Purchase Policy");
		const returnPolicyLink = component.getByText("Return Policy");

		expect(contactLink).toBeTruthy();
		expect(wholeSaleLink).toBeTruthy();
		expect(purchasePolicyLink).toBeTruthy();
		expect(returnPolicyLink).toBeTruthy();
	});

	it("Links have the correct herf attribute linking to the correct pages", () => {
		const component = render(<Footer />);

		const contactLink = component.getByText("Contact");
		const wholeSaleLink = component.getByText("Wholesale");
		const purchasePolicyLink = component.getByText("Purchase Policy");
		const returnPolicyLink = component.getByText("Return Policy");

		expect(contactLink.getAttribute("href")).toEqual("/Contact");
		expect(wholeSaleLink.getAttribute("href")).toEqual("/Wholesale");
		expect(purchasePolicyLink.getAttribute("href")).toEqual("/PurchasePolicy");
		expect(returnPolicyLink.getAttribute("href")).toEqual("/ReturnPolicy");
	});

	it("Displays a Instagram Social Icon", () => {
		const component = render(<Footer />);

		const instagramLink = component.getByTestId("footerInstagramLink");

		expect(instagramLink).toBeTruthy();
	});
});

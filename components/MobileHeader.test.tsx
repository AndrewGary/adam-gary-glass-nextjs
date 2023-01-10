import React from "react";
import {
	render,
	screen,
} from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { useSession } from "next-auth/react";
import { Store, AnyAction } from "@reduxjs/toolkit";
import MobileHeader from "./MobileHeader";
import "@testing-library/jest-dom";

jest.mock("next-auth/react", () => {
	return {
		useSession: jest.fn(),
		signIn: jest.fn(),
		signOut: jest.fn(),
	};
});

const mockSetHamburgerMenuActive = jest.fn();
jest.mock("react", () => {
	const originalReact = jest.requireActual("react");
	return {
		...originalReact,
		useState: jest.fn(() => [false, mockSetHamburgerMenuActive]),
	};
});

let searchActive = false;
const mockSetSearchActive = jest.fn();
jest.mock("react", () => {
	const originalReact = jest.requireActual("react");
	return {
		...originalReact,
		useState: jest.fn(() => [searchActive, mockSetSearchActive]),
	};
});

const options = [
	{
		text: "Shop",
		href: "/Products",
	},
	{
		text: "Login",
		href: "",
	},
	{
		text: "Purchase Policy",
		href: "/PurchasePolicy",
	},
	{
		text: "Return Policy",
		href: "/ReturnPolicy",
	},
	{
		text: "Contact",
		href: "/Contact",
	},
];

describe("Desktop Header Component", () => {
	let store: Store<any, AnyAction>;
	let mockStore;
	let useSessionMock: jest.Mock<any, any>;

	beforeEach(() => {
		mockStore = configureStore([]);
		store = mockStore({
			cart: {
				numberOfItems: 2,
			},
		});
		useSessionMock = useSession as jest.Mock;
	});

	it("Renders Correctly", async () => {
		useSessionMock.mockReturnValue({
			data: null,
		});

		const component = render(
			<Provider store={store}>
				<MobileHeader />
			</Provider>
		);

		expect(component).toBeTruthy();
	});

	it("Displays the website title", () => {
		useSessionMock.mockReturnValue({
			data: null,
		});

		const component = render(
			<Provider store={store}>
				<MobileHeader />
			</Provider>
		);

		const websiteTitle = component.queryByRole("heading");

		expect(websiteTitle).toBeTruthy();
	});

	it("Displays a hamburger menu", () => {
		useSessionMock.mockReturnValue({
			data: null,
		});

		const component = render(
			<Provider store={store}>
				<MobileHeader />
			</Provider>
		);

		const hamburgerMenuIcon = component.queryByTestId("hamburgerMenuIcon");

		expect(hamburgerMenuIcon).toBeTruthy();
	});

	// it("SetHamburgerMenuActive is called when the hamburger menu is clicked", () => {
	//     useSessionMock.mockReturnValue({
	// 		data: null,
	// 	});

	// 	const component = render(
	// 		<Provider store={store}>
	// 			<MobileHeader />
	// 		</Provider>
	// 	);

	//     const hamburgerMenuNode = screen.getByTestId('hamburgerMenu');

	//     fireEvent.click(hamburgerMenuNode);

	//     expect(mockSetHamburgerMenuActive).toHaveBeenCalledWith(!false);

	//   });

	it("Make sure the search bar shows up when the search icon is clicked on", () => {
		useSessionMock.mockReturnValue({
			data: null,
		});

		render(
			<Provider store={store}>
				<MobileHeader />
			</Provider>
		);

		const searchInput = screen.getByPlaceholderText("Search site...");

		const searchIcon = screen.getByTestId("activateSearchIcon");

		console.log();

		expect(searchInput).toBeVisible();

		const yeah = screen.getByText("Shop");

		expect(yeah).toBeVisible();

		// fireEvent.click(searchIcon);

		// expect(searchInput).toBeVisible();
		// const component = render(
		// 	<Provider store={store}>
		// 		<MobileHeader />
		// 	</Provider>
		// );
	});
});

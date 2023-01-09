import React from "react";
import {
	render,
	fireEvent,
	waitFor,
	within,
	screen,
} from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { useSession } from "next-auth/react";
import { Store, AnyAction } from "@reduxjs/toolkit";
import MobileHeader from "./MobileHeader";

jest.mock("next-auth/react", () => {
	return {
		useSession: jest.fn(),
		signIn: jest.fn(),
		signOut: jest.fn(),
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

    it('Displays the website title', () => {
            useSessionMock.mockReturnValue({
        		data: null,
        	});
    
        	const component = render(
        		<Provider store={store}>
        			<MobileHeader />
        		</Provider>
        	);
    
            const websiteTitle = component.queryByRole('heading');
    
            expect(websiteTitle).toBeTruthy();
        })

        it('Displays a hamburger menu', () => {
            useSessionMock.mockReturnValue({
        		data: null,
        	});
    
        	const component = render(
        		<Provider store={store}>
        			<MobileHeader />
        		</Provider>
        	);

            const hamburgerMenuIcon = component.queryByTestId('hamburgerMenuIcon');

            expect(hamburgerMenuIcon).toBeTruthy();
        })

        it("Doesn't display the links until the hamburger menu is tapped", async () => {
            useSessionMock.mockReturnValue({
        		data: null,
        	});
    
        	const component = render(
        		<Provider store={store}>
        			<MobileHeader />
        		</Provider>
        	);

            const test = await screen.findByText("Shop");
            console.log('TESTTTTT: ', test);

            // let shopLink = screen.getByText('Shop');
            // let purchasePolicyLink = screen.getByText('Purchase Policy');
            // let returnPolicyLink = screen.getByText('Return Policy');
            // let contactLink = screen.getByText('Contact');

            // expect(shopLink).toBeFalsy();
            // expect(purchasePolicyLink).toBeFalsy();
            // expect(returnPolicyLink).toBeFalsy();
            // expect(contactLink).toBeFalsy();

            // const hamburgerMenuIcon = component.queryByTestId('hamburgerMenuIcon');

            // fireEvent.click(hamburgerMenuIcon);

            // shopLink = component.queryByText('Shop');
            // purchasePolicyLink = component.queryByText('Purchase Policy');
            // returnPolicyLink = component.queryByText('Return Policy');
            // contactLink = component.queryByText('Contact');

        //     expect(shopLink).toBeTruthy();
        //     expect(purchasePolicyLink).toBeTruthy();
        //     expect(returnPolicyLink).toBeTruthy();
        //     expect(contactLink).toBeTruthy();
        })

    // it("Displays the correct Link texts", async () => {
	// 	useSessionMock.mockReturnValue({
	// 		data: null,
	// 	});

	// 	const component = render(
	// 		<Provider store={store}>
	// 			<DesktopHeader />
	// 		</Provider>
	// 	);

	// 	const shopLink = component.queryByText("Shop");
    //     const purchasePolicyLink = component.queryByText('Purchase Policy');
    //     const returnPolicyLink = component.queryByText('Return Policy');
    //     const contactLink = component.queryByText('Contact');

	// 	expect(shopLink).toBeTruthy();
	// 	expect(purchasePolicyLink).toBeTruthy();
	// 	expect(returnPolicyLink).toBeTruthy();
	// 	expect(contactLink).toBeTruthy();
	// });

    // it('Displays the website title', () => {
    //     useSessionMock.mockReturnValue({
	// 		data: null,
	// 	});

	// 	const component = render(
	// 		<Provider store={store}>
	// 			<DesktopHeader />
	// 		</Provider>
	// 	);

    //     const websiteTitle = component.queryByRole('heading');

    //     expect(websiteTitle).toBeTruthy();
    // })

    // it('Types the correct info in the search bar when it is selected and then typed in', async () => {
    //     useSessionMock.mockReturnValue({
	// 		data: null,
	// 	});

	// 	const component = render(
	// 		<Provider store={store}>
	// 			<DesktopHeader />
	// 		</Provider>
	// 	);

    //     const searchInput: any = component.queryByPlaceholderText('Search site...')

    //     expect(searchInput).toBeTruthy();

    //     fireEvent.change(searchInput, { target: { value: 'Search Test!' }})

    //     expect(searchInput).toHaveProperty('value', 'Search Test!');
    // })
});

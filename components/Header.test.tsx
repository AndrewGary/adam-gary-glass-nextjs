import React from 'react';
import { render, fireEvent, waitFor, within, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useSession } from 'next-auth/react';
import Header from './Header';
import { Store, AnyAction } from '@reduxjs/toolkit';

jest.mock('next-auth/react', () => {
  return {
    useSession: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
  };
});

const options = [
  {
    text: 'Shop',
    href: '/Products',
  },
  {
    text: 'Login',
    href: '',
  },
  {
    text: 'Purchase Policy',
    href: '/PurchasePolicy',
  },
  {
    text: 'Return Policy',
    href: '/ReturnPolicy',
  },
  {
    text: 'Contact',
    href: '/Contact',
  },
];

describe('Desktop Header Component', () => {
  let store: Store<any, AnyAction>;
  let mockStore;
  let useSessionMock;

  beforeEach(() => {
    mockStore = configureStore([]);
    store = mockStore({
      cart: {
        numberOfItems: 2,
      },
    });
    useSessionMock = useSession as jest.Mock;
  });

  it('Renders Correctly', () => {
    useSessionMock.mockReturnValue({
      data: null,
    });

    screen.resize({ width: 1920, height: 1080 });

    const component = render(
        <Provider store={store}>
            <Header />
        </Provider>
    )
    
    const mobileComponent = component.getByTestId('mobile component');

    const desktopComponent = component.getByTestId('desktop component');

    expect(mobileComponent).toBeTruthy();
    expect(desktopComponent).toBeTruthy();

    const idk = mobileComponent.getByText('Shop');    
    
    expect(idk).toBeFalsy();

  });

//   it('Displays the correct number of items in the cart', () => {
//     useSessionMock.mockReturnValue({
//       data: null,
//     });
//     const { getByTestId } = render(
//       <Provider store={store}>
//         <Header />
//       </Provider>
//     );

//     const cartButton = getByTestId('cart-button');
//     expect(cartButton).toHaveTextContent(`Cart (${store.getState().cart.numberOfItems})`);
//   });

//   it('Displays the correct options when the user is not logged in', () => {
//     useSessionMock.mockReturnValue({
//       data: null,
//     });
//     const { getByTestId, getByText } = render(
//       <Provider store={store}>
//         <Header />
//       </Provider>
//     );

//     const menuList = getByTestId('menu-list');

})
   

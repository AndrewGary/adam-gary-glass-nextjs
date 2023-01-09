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

  it('Renders Correctly', async () => {
    useSessionMock.mockReturnValue({
      data: null,
    });

    

    const component = render(
        <Provider store={store}>
            <Header />
        </Provider>
    )
    
    window.resizeTo(1920, 1080);

    const shopLink = component.queryByText('Shop');

    expect(shopLink).toBeTruthy();

    

    
})

// it('yeah', () => {
//   window.resizeTo(400, 800);

//     // const mobileShopLink = component.findByText('Shop');
//     const yeah = screen.getByText('Shop');

//     console.log('YEAH: ', yeah);

//     expect(yeah).toBeTruthy();
// })
   
})
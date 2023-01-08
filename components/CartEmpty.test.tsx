import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import CartEmpty from './CartEmpty';
import userEvent from '@testing-library/user-event';


describe('Empty Cart Component', () => {

    it('Should render correctly', () => {
        render(<CartEmpty />)
    })

    it('should ask if they are 21', () => {
        render(<CartEmpty />);

        const text = screen.getByText('Your cart is empty')

        expect(text).toBeTruthy(); 
    })

    it("renders the correct Link text", () => {
        render(<CartEmpty />);
        const buttonText = screen.getByText('Shop Now');

        expect(buttonText).toBeTruthy();
      });

    it('Button should link to the /Products page', async () => {
        render(<CartEmpty />);
        const button = screen.getByText('Shop Now');

        expect(button.getAttribute('href')).toEqual('/Products');
    })
      
})
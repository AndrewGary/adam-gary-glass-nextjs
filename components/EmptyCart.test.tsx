import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import CartEmpty from './CartEmpty';

describe('Empty Cart Page', () => {
    it('should ask if they are 21', () => {
        render(<CartEmpty />);

        const text = screen.getByText('Your cart is empty')

        expect(text).toBeTruthy();
    })
})
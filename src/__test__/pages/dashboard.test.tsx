import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardPage from '../../pages/dashboard';

// Mock the useApp hook
jest.mock('../../utils/app', () => ({
    useApp: jest.fn(() => ({
        movies: [
            {
                episode_id: 1,
                title: 'Movie 1',
                price: 1000,
            },
            {
                episode_id: 2,
                title: 'Movie 2',
                price: 2000,
            },
        ],
        loading: false,
        addToCart: jest.fn(),
    })),
}));

describe('DashboardPage Component', () => {
    it('renders movies correctly', () => {
        render(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>
        );
        const cartItemTitles = screen.getAllByTestId('cart-item-title');
        expect(cartItemTitles).toHaveLength(2);
    });
});

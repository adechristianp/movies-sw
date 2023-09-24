import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DetailPage from '../../pages/detail';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }), // Mock useParams
  useLocation: () => ({ state: null }), // then fetchMovieDetails
}));

jest.mock('../../services/api', () => ({
  fetchMovieDetails: async () => ({
    episode_id: 1,
    title: 'Movie 1',
    opening_crawl: 'Desc text',
  }),
}));

jest.mock('../../utils/app', () => ({
  useApp: jest.fn(() => ({
    addToCart: jest.fn(),
  })),
}));

describe('DetailPage Component', () => {
    it('render movie detail correctly', async () => {
        render(
        <MemoryRouter>
            <DetailPage />
        </MemoryRouter>
        );
        await screen.findByText('Movie 1');
        const movieTitle = screen.getByText('Movie 1');
        expect(movieTitle).toBeInTheDocument();
    });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider, useApp } from  '../../src/utils/app';

jest.mock('../services/api', () => ({
  fetchMovies: jest.fn(() => Promise.resolve([])), // Mock an empty array of movies for testing
}));

test('renders AppProvider component', async () => {
  render(
    <AppProvider>
      <TestComponent />
    </AppProvider>
  );

  // You can use screen queries to assert the presence of UI elements or text
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // You can also wait for certain elements to appear or disappear
  await screen.findByText('Add To Cart Success');
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
});

function TestComponent() {
  const { loading, movies, cart, addToCart } = useApp();

  return (
    <div>
      {loading ? (
        'Loading...'
      ) : (
        <div>
          {movies.map((movie) => (
            <div key={movie.episode_id}>
              <span>{movie.title}</span>
              <button onClick={() => addToCart(movie)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

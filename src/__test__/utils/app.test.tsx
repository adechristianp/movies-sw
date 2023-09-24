import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { AppProvider, useApp } from '../../utils/app';

jest.mock('../../services/api', () => ({
  fetchMovies: jest.fn(() => Promise.resolve([])),
}));

describe('AppContext Functions', () => {
  window.alert = () => {};  
  it('addToCart function', async () => {
    const { result } = renderHook(() => useApp(), {
      wrapper: AppProvider,
    });

    await act( async () => {
      result.current.addToCart({
        episode_id: 1,
        title: 'Movie 1',
        price: 1000,
        image: 'movie1.jpg',
        description: 'desc',
      });
    });

    // Verif the movie was added to the cart
    expect(result.current.cart).toEqual([
      {
        movie: {
          episode_id: 1,
          title: 'Movie 1',
          price: 1000,
          image: 'movie1.jpg',
          description: 'desc',
        },
        quantity: 1,
      },
    ]);
  });

  it('removeFromCart function', async () => {
    const { result } = renderHook(() => useApp(), {
      wrapper: AppProvider,
    });

    await act( async () => {
      result.current.addToCart({
        episode_id: 1,
        title: 'Movie 1',
        price: 1000,
        image: 'movie1.jpg',
        description: 'desc',
      });
      result.current.removeFromCart(1);
    });

    // Verif the cart is empty array
    expect(result.current.cart).toEqual([]);
  });

  it('clearCart function', async () => {
    const { result } = renderHook(() => useApp(), {
      wrapper: AppProvider,
    });

    await act( async () => {
      result.current.addToCart({
        episode_id: 1,
        title: 'Movie 1',
        price: 1000,
        image: 'movie1.jpg',
        description: 'desc',
      });
      result.current.addToCart({
        episode_id: 2,
        title: 'Movie 2',
        price: 2000,
        image: 'movie2.jpg',
        description: 'desc',
      });
      result.current.clearCart();
    });

    // Verif the cart is empty array
    expect(result.current.cart).toEqual([]);
  });
});
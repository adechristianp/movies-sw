import React, { createContext, useContext, useEffect, useState } from 'react';
import { Movie } from '../types/movies';
import { fetchMovies } from '../services/api';

interface CartItem {
    movie: Movie;
    quantity: number;
}

interface AppContextType {
    movies: Movie[];
    loading: boolean;
    cart: CartItem[];
    addToCart: (movie: Movie) => void;
    removeFromCart: (movieId: number) => void;
    clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = (props: {children: any}) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const addToCart = (movie: Movie) => {
        const existingCartItem = cart.find((item) => item.movie.episode_id === movie.episode_id);

        if (existingCartItem) {
        existingCartItem.quantity += 1;
        setCart([...cart]);
        } else {
        const newCartItem: CartItem = { movie, quantity: 1 };
        setCart([...cart, newCartItem]);
        }
        alert('Add To Cart Success');
    };

    const removeFromCart = (movieId: number) => {
        const updatedCart = cart.filter((item) => item.movie.episode_id !== movieId);
        setCart(updatedCart);
    };

    const clearCart = () => {
        setCart([]);
    };
    useEffect(()=> {
        const fetchData = async () => {
            setLoading(true);
            try {
                const movieData = await fetchMovies();
                const movieDataCustom = movieData.map((movie: any) => ({
                    ...movie,
                    description: movie.opening_crawl,
                    price: 10000,
                    image: "https://c8.alamy.com/comp/EXRG0F/1970s-usa-star-wars-film-poster-EXRG0F.jpg"
                  }));
                setMovies(movieDataCustom);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
            setLoading(false);
        };
    
        fetchData();
    },[])

    return (
        <AppContext.Provider value={{ movies, loading, cart, addToCart, removeFromCart, clearCart }}>
        {props.children}
        </AppContext.Provider>
    );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('Error useApp Provider');
  }
  return context;
};

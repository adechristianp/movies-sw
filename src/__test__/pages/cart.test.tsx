import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CartPage from '../../pages/cart';
const cart = [
    {
        movie: {
            episode_id: 1,
            title: 'Movie 1',
            price: 50000,
            image: 'movie1.jpg',
        },
        quantity: 2,
    },
    {
        movie: {
            episode_id: 2,
            title: 'Movie 2',
            price: 50000,
            image: 'movie2.jpg',
        },
        quantity: 1,
    },
];

jest.mock('../../utils/app', () => ({
    useApp: jest.fn(() => ({
        cart: cart,
        removeFromCart: jest.fn((episodeId) => {
            const updatedCart = cart.filter((item) => item.movie.episode_id !== episodeId);
            Array.prototype.splice.apply(cart, [0, cart.length, ...updatedCart]);
        }),
        clearCart: jest.fn(),
    })),
}));

describe('CartPage Component', () => {
    it('render cart items and total correctly', () => {
        render(<MemoryRouter><CartPage /></MemoryRouter>);
    
        const cartItemTitles = screen.getAllByTestId('cart-item-title');
        expect(cartItemTitles).toHaveLength(2);
        
        const totalPrice = screen.getByText('Total Price: Rp150.000'); 
        expect(totalPrice).toBeInTheDocument();
    });
    it('render cart remove 1 item', () => {
        render(<MemoryRouter><CartPage /></MemoryRouter>);
        const cartItemTitles = screen.getAllByTestId('cart-item-title');
        expect(cartItemTitles).toHaveLength(2);

        const buttonElement = screen.getByTestId('cart-item-button1');
        fireEvent.click(buttonElement);

        cleanup()
        render(<MemoryRouter><CartPage /></MemoryRouter>);
        const updatedCartItemTitles = screen.getAllByTestId('cart-item-title');
        expect(updatedCartItemTitles).toHaveLength(1);
        const updatedtotalPrice = screen.getByText('Total Price: Rp100.000'); 
        expect(updatedtotalPrice).toBeInTheDocument();
    });

    it('displays an empty cart message when the cart is empty', () => {
        require('../../utils/app').useApp.mockReturnValueOnce({
            cart: [],
            removeFromCart: jest.fn(),
            clearCart: jest.fn(),
        });
    

        render(
            <MemoryRouter>
                <CartPage />
            </MemoryRouter>
        );

        const emptyCartMessage = screen.getByText('Your cart is empty.');
        expect(emptyCartMessage).toBeInTheDocument();
    });
});

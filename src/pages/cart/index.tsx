import { Link } from 'react-router-dom';
import './styles.css';
import DefaultButton from '../../components/button';
import { useApp } from '../../utils/app';
import { moneyFormat } from '../../data/functions';

const CartPage = () => {
    const { cart, removeFromCart, clearCart } = useApp();

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.movie.price * item.quantity, 0);
    };

    return (
        <div className="container-cart">
        {cart.length === 0 ? (
            <p className="">
            Your cart is empty. <Link to="/" className="continue-link">Back to Catalog</Link>
            </p>
        ) : (
            <>
                <div className='container-item'>
                    {cart.map((e, idx) => (
                        <div key={idx} className="container-item-inside">
                            <div className="container-item-detail">
                                <img className='cart-image' src={e.movie.image} alt={e.movie.title} />
                                <div>
                                    <h3 data-testid='cart-item-title' className='cart-item-title'>{e.movie.title}</h3>
                                    <p className='cart-item-detail'>Price: {moneyFormat(e.movie.price)}</p>
                                    <p className='cart-item-detail'>Quantity: {e.quantity}</p>
                                    <p className='cart-item-detail-total'>Total: {moneyFormat(e.movie.price * e.quantity)}</p>
                                </div>
                            </div>
                            <DefaultButton data-testid={`cart-item-button${idx}`} style={{backgroundColor: '#fe2828'}} label='Remove' onClick={() => removeFromCart(e.movie.episode_id)}/>
                        </div>
                    ))}
                </div>
                <div className='cart-total-container'>
                    <div className='button-clear'>
                        <Link to="/" className="continue-link">Continue Shopping</Link>
                        <span>or</span>
                        <DefaultButton style={{backgroundColor: '#fea828'}} label='Clear Cart' onClick={clearCart}/>
                    </div>
                    <p className="cart-total">Total Price: {moneyFormat(calculateTotalPrice())}</p>
                </div>
            </>
        )}
        </div>
    );
};

export default CartPage;

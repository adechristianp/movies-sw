import { Link } from 'react-router-dom';
import './styles.css';
import DefaultButton from '../../components/button';
import { useApp } from '../../utils/app';
import { moneyFormat } from '../../data/functions';

const DashboardPage = () => {
    const { movies, loading, addToCart } = useApp();
    return (
        <div className="container">
            {loading ?
                "Loading" : 
                movies.map((movie, idx) => (
                    <div key={movie.episode_id} className="card">
                        <img src={'https://c8.alamy.com/comp/EXRG0F/1970s-usa-star-wars-film-poster-EXRG0F.jpg'} alt={movie.title} />
                        <h2 className="card-title" data-testid='cart-item-title'>{movie.title}</h2>
                        <p className="card-price">{moneyFormat(movie.price)}</p>
                        <div className='card-button'>
                            <Link to={`/detail/${movie.episode_id}`} state={movie}>
                                <DefaultButton label='View Details' />
                            </Link>
                            <DefaultButton testId={`atc-${idx}`} label='Add To Cart' onClick={()=>addToCart(movie)} />
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default DashboardPage;

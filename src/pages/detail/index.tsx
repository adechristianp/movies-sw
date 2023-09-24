import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/api';
import { Movie } from '../../types/movies';
import './styles.css';
import DefaultButton from '../../components/button';
import { useApp } from '../../utils/app';
import { moneyFormat } from '../../data/functions';

const DetailPage = () => {
  const {state} = useLocation();
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie>();
  const { addToCart } = useApp();
  const handleAddToCart = () => {
    if(movie) addToCart(movie);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchMovieDetails(id || "");
        setMovie({
          ...movieData,
          description: movieData.opening_crawl,
          price: 100000,
          image: 'https://c8.alamy.com/comp/EXRG0F/1970s-usa-star-wars-film-poster-EXRG0F.jpg'
        });
      } catch (error) {
        console.log('Error fetching movie details:', error);
      }
    };
    if(state === null) fetchData();
    else setMovie(state);
  }, [id, state]);

  return (
    <div className="container">
      {movie ? (
        <div className="container-box">
          <img className="image" src={movie.image} alt={movie.title} />
          <div className='desc-container'>
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-description">{movie.description}</p>
            <p className="movie-price">{moneyFormat(movie.price)}</p>
            <DefaultButton label='Add To Cart' onClick={handleAddToCart} />
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default DetailPage;

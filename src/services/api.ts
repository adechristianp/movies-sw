import axios from "axios";

const BASE_URL = 'https://swapi.dev/api/';

export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}films`);
    return response.data.results;
  } catch (error) {
    console.error('Failed fetching:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}films/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  };
  
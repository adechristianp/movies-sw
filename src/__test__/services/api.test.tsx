/* eslint-disable jest/no-conditional-expect */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchMovieDetails, fetchMovies } from '../../services/api';
const mockAxios = new MockAdapter(axios);

describe('API Functions', () => {
    afterEach(() => {
        mockAxios.reset();
    });

    it('fetches movies successfully', async () => {
        const mockMovies = [{ title: 'Movie 1' }, { title: 'Movie 2' }];
        mockAxios.onGet('https://swapi.dev/api/films').reply(200, { results: mockMovies });
        const movies = await fetchMovies();
        expect(movies).toEqual(mockMovies);
    });

    it('handles fetchMovies error', async () => {
        mockAxios.onGet('https://swapi.dev/api/films').reply(500);
        try {
            await fetchMovies();
            expect(true).toBe(false);
        } catch (error: any) {
            expect(error.response.status).toEqual(500);
        }
    });

    it('fetches movie details successfully', async () => {
        const mockMovie = { title: 'Movie 1', opening_crawl: 'Some text' };
        mockAxios.onGet('https://swapi.dev/api/films/1').reply(200, mockMovie);
        const movie = await fetchMovieDetails('1');
        expect(movie).toEqual(mockMovie);
    });

    it('handles fetchMovieDetails error', async () => {
        mockAxios.onGet('https://swapi.dev/api/films/1').reply(500);
        try {
            await fetchMovieDetails('1');
            expect(true).toBe(false);
        } catch (error: any) {
            expect(error.response.status).toEqual(500);
        }
    });
});

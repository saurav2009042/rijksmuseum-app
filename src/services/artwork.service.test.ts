import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_KEY, BASE_URL } from '../constants';
import { mockArtworks } from '../mocks';
import { fetchArtworksList } from './artwork.service';

// We mock the console.error as the request to fetch the artwork fails 
const originalConsoleError = console.error;

beforeAll(() => {
    console.error = jest.fn();
});

afterAll(() => {
    console.error = originalConsoleError;
});

describe('fetchArtworksList Service', () => {
    const mock = new MockAdapter(axios);

    afterEach(() => {
        mock.reset();
    });

    it(`should fetch the list of artworks`, async () => {
        mock.onGet(`${BASE_URL}/collection`, {
            params: {
                key: API_KEY,
                q: 'Van Gogh',
                p: 1,
                ps: 20,
            },
        }).reply(200, {
            artObjects: mockArtworks,
        });

        const result = await fetchArtworksList('Van Gogh', 1);

        expect(result).toEqual(mockArtworks);
    });

    it(`should handle error if fetching artworks list fails`, async () => {
        mock.onGet(`${BASE_URL}/collection`, {
            params: {
                key: API_KEY,
                q: 'Van Goghul',
                p: 1,
                ps: 20,
            },
        }).reply(500);

        await expect(fetchArtworksList('Van Goghul', 1))
            .rejects
            .toThrow('Request failed with status code 500');
    });
});

export { };

import axios from 'axios';
import { API_KEY, BASE_URL } from '../constants';
import { IArtworkResponse } from '../interfaces';

const fetchArtworksList = async (query: string, page: number): Promise<Array<IArtworkResponse>> => {
    try {
        const response = await axios.get(`${BASE_URL}/collection`, {
            params: {
                key: API_KEY,
                q: query,
                p: page,
                ps: 20,
            },
        });

        return response.data.artObjects;

    } catch (error) {
        console.error('Error fetching artworks list:', error);
        throw error;
    }
};

export { fetchArtworksList };

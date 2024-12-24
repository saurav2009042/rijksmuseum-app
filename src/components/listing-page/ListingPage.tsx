import React, { useCallback, useEffect, useState } from 'react';
import { EListingPage } from '../../enums';
import { IArtworkResponse, IArtworkResponseWithImages } from '../../interfaces';
import { fetchArtworksList } from '../../services';
import Tile from '../tile/Tile';
import './ListingPage.css';

const ListingPage: React.FC = () => {
    const [artworks, setArtworks] = useState<Array<IArtworkResponseWithImages>>([]);
    const [inputValue, setInputValue] = useState('');       // Holds the value input by the user in Search Bar
    const [searchQuery, setSearchQuery] = useState('');     // Holds the query value
    const [pageNumber, setPageNumber] = useState(1);        // Holds the page number
    const [loading, setLoading] = useState(false);          // Flag used for enabling / disabling Load More button

    const getArtworks = useCallback(async (query: string, currentPage: number) => {
        try {
            setLoading(true);

            const artworksList: Array<IArtworkResponse> = await fetchArtworksList(query, currentPage);
            const artworksWithImages: Array<IArtworkResponseWithImages> = artworksList.map((artwork: IArtworkResponse) => ({
                ...artwork,
                imageUrl: artwork.webImage?.url,
            }));

            setArtworks((prevArtworks) => currentPage === 1 ? artworksWithImages : [...prevArtworks, ...artworksWithImages]);

        } catch (error) {
            console.error('Error loading artworks:', error);

        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getArtworks('', 1);
    }, [getArtworks]);

    useEffect(() => {
        getArtworks(searchQuery, 1);
    }, [searchQuery, getArtworks]);

    useEffect(() => {
        if (pageNumber > 1) {
            getArtworks(searchQuery, pageNumber);
        }
    }, [pageNumber, searchQuery, getArtworks]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchQuery(inputValue);
        setPageNumber(1);
    };

    const handleLoadMore = () => {
        setPageNumber((previousPageNumber) => previousPageNumber + 1);
    };

    return (
        <div className='listing-page'>
            <form className='search-container' onSubmit={handleSearch}>
                <input type='text' 
                       placeholder='Search' 
                       value={inputValue} 
                       onChange={(e) => setInputValue(e.target.value)} />
                <button type='submit'>
                    {EListingPage.SUBMIT_BUTTON}
                </button>
            </form>
            <div className='grid'>
                {artworks.map((artwork: IArtworkResponseWithImages) => (
                    <Tile key={artwork.objectNumber} artwork={artwork} />
                ))}
            </div>
            <button className='load-more' 
                    onClick={handleLoadMore}
                    disabled={loading}>
                {loading ? EListingPage.LOADING : EListingPage.LOAD_MORE_BUTTON}
            </button>
        </div>
    );
};

export default ListingPage;

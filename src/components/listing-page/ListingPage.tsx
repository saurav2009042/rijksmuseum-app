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

            /**
             * The below approach ensures that when we display the artworks, each one has its own image URL.
             * It therefore simplifies the rendering logic of our component.
             */
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

    /**
     * This is used to handle the initial loading of our application.
     * With a blank search query and pageNumber = 1, the API will return 20 images.
     */
    useEffect(() => {
        getArtworks('', 1);
    }, [getArtworks]);

    /**
     * This is used to handle the case when there is a search query or to reset to the initial state.
     * The artworks are fetched corresponding to the search query with page number set to 1.
     * If empty, the base state of the application is loaded.
     */
    useEffect(() => {
        getArtworks(searchQuery, 1);
    }, [searchQuery, getArtworks]);

    /**
     * This is used to handle pagination.
     * When user clicks on 'Load More' button, the page number gets incremented.
     * As a result, the next 20 artworks are fetched and appended to the list.
     */
    useEffect(() => {
        if (pageNumber > 1) {
            getArtworks(searchQuery, pageNumber);
        }
    }, [pageNumber, searchQuery, getArtworks]);

    /**
     * The main goal of this function is to set the inputValue as the searchQuery.
     * We have inputValue to store whatever the user types, but it is not used to make a request to the server.
     * Only when the user clicks on Submit button is when this function is called and the searchQuery is updated accordingly.
     */
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

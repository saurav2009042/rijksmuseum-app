/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/prefer-screen-queries */
import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { EListingPage } from '../../enums';
import { mockArtworksWithImages } from '../../mocks';
import { fetchArtworksList } from '../../services/artwork.service';
import ListingPage from './ListingPage';

jest.mock('../../services/artwork.service');

const originalConsoleError = console.error;

beforeAll(() => {
    console.error = jest.fn();
});

afterAll(() => {
    console.error = originalConsoleError;
});

describe('ListingPage Component', () => {
    beforeEach(() => {
        (fetchArtworksList as jest.Mock).mockResolvedValue(mockArtworksWithImages);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it(`renders initial artworks on page load`, async () => {
        const { getByText } = render(<ListingPage />);

        await waitFor(() => {
            expect(getByText('Some Artwork 1')).toBeInTheDocument();
            expect(getByText('Some Artwork 2')).toBeInTheDocument();
        });
    });

    it(`fetches and displays artworks based on search query`, async () => {
        const { getByPlaceholderText, getByText } = render(<ListingPage />);

        // Get hold of the Search Bar and trigger an input change
        const searchInput = getByPlaceholderText('Search');
        fireEvent.change(searchInput, { target: { value: 'Van Gogh' } });

        // Get hold of the Submit button and trigger a click
        const submitButton = getByText(EListingPage.SUBMIT_BUTTON);
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(fetchArtworksList).toHaveBeenCalledWith('Van Gogh', 1);
            expect(getByText('Some Artwork 1')).toBeInTheDocument();
            expect(getByText('Some Artwork 2')).toBeInTheDocument();
        });
    });

    it(`loads more artworks when Load More button is clicked`, async () => {
        const { getByText, queryByText, getAllByText } = render(<ListingPage />);

        await waitFor(() => {
            expect(getByText('Some Artwork 1')).toBeInTheDocument();
            expect(getByText('Some Artwork 2')).toBeInTheDocument();
        });

        // Get hold of the Load More button and trigger a click
        const loadMoreButton = getByText(EListingPage.LOAD_MORE_BUTTON);
        fireEvent.click(loadMoreButton);

        // Wait for the Load More button to have its label changed to Loading...
        await waitFor(() => {
            expect(loadMoreButton).toHaveTextContent(EListingPage.LOADING);
        });

        await waitFor(() => {
            expect(fetchArtworksList).toHaveBeenCalledWith('', 2);
            expect(getAllByText('Some Artwork 1')).toHaveLength(2);
            expect(getAllByText('Some Artwork 2')).toHaveLength(2);

            // Finally, when the page has finished loading, the user will get back the Load More button
            expect(queryByText(EListingPage.LOAD_MORE_BUTTON)).toBeInTheDocument();
        });
    });
});

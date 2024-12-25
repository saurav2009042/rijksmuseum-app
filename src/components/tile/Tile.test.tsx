/* eslint-disable testing-library/prefer-screen-queries */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { mockArtworksWithImages } from '../../mocks';
import Tile from './Tile';

describe('Tile Component', () => {
    it(`renders the image and title`, () => {
        const { getByAltText, getByText } = render(<Tile artwork={mockArtworksWithImages[0]} />);

        // We get hold of an image by its alt text
        const imageElement = getByAltText('Some Artwork 1');
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', 'https://www.rijksmuseum.nl/asset/someArtwork1.jpg');

        const titleElement = getByText('Some Artwork 1');
        expect(titleElement).toBeInTheDocument();
    });
});

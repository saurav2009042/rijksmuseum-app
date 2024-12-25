/* eslint-disable testing-library/prefer-screen-queries */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('./components/header/Header', () => () => <div>Some Header</div>);
jest.mock('./components/listing-page/ListingPage', () => () => <div>Some ListingPage</div>);

describe('App Component', () => {
    it(`renders Header and ListingPage components`, () => {
        const { getByText } = render(<App />);

        expect(getByText('Some Header')).toBeInTheDocument();
        expect(getByText('Some ListingPage')).toBeInTheDocument();
    });
});

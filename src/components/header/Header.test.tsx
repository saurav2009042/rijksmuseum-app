/* eslint-disable testing-library/prefer-screen-queries */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
    it(`renders the logo`, () => {
        const { getByAltText } = render(<Header />);
        const logo = getByAltText('Logo');

        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', 'test-file-stub');
    });
});

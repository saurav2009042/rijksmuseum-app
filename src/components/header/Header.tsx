import React from 'react';
import logo from '../../assets/rijksmuseum.png';
import './Header.css';

const Header: React.FC = () => (
    <header className='header'>
        <img src={logo} alt='Logo' className='logo' />
    </header>
);

export default Header;

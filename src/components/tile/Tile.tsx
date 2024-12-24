import React from 'react';
import { IArtworkResponseWithImages } from '../../interfaces';
import './Tile.css';

const Tile: React.FC<{ artwork: IArtworkResponseWithImages }> = ({ artwork }) => {
    const { imageUrl, title } = artwork;

    return (
        <div className='tile'>
            <img src={imageUrl} alt={title} className='image' />
            <div className='title'>{title}</div>
        </div>
    );
};

export default Tile;

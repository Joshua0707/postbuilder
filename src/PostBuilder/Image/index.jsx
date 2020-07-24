import React, { useState } from 'react';
import { ImageWrapper } from '../../style';

const EditImage = ({ updateItem }) => {
    const [ src, setSrc ] = useState('');
    const [ alt, setAlt ] = useState('');

    const updateImageProperties = (e) => {
        e.preventDefault();
        updateItem({ src, alt })
    }

    return (
        <form className="create-img" onSubmit={updateImageProperties}>
            <input placeholder="Add Src" value={src} onChange={e => setSrc(e.target.value)} />
            <input placeholder="Add Alt" value={alt} onChange={e => setAlt(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    )
}

const Image = ({ src, alt, updateItem, setFocusId }) => (
    <ImageWrapper onFocus={setFocusId} tabIndex={0}>
        { 
            src && alt ? <img src={src} alt={alt} /> : <EditImage updateItem={updateItem} />
        }
    </ImageWrapper>
);

export default Image;
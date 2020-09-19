import React from 'react';
import { BsGrid, BsListNested } from 'react-icons/bs';
import './pref.css';

const PrefView = () => {
    return (
        <main className="pref-vw">
            <span>
                <BsGrid />
            </span>
            <span>
                <BsListNested />
            </span>
        </main>
    );
}



export default PrefView;
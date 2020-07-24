import React from 'react';
import { FaImage, FaPlus, FaTimes, FaCode } from 'react-icons/fa';

const Toolbar = ({ addItem, deleteItem, focusId }) => (
    <>
        <button onClick = {() => addItem(null, "")}> <FaPlus /> </button>
        <button onClick = {() => addItem('img', {  })}> <FaImage /> </button>
        <button onClick = {() => addItem('code', {  })}> <FaCode /> </button>
        <button className="del" onClick = {() => deleteItem(focusId)}> <FaTimes /> </button>
    </>
);

export default Toolbar;
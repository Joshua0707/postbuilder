import React from 'react';
import { Link } from 'react-router-dom';
import './ideas.css';
import { FaPlus } from 'react-icons/fa';

const IdeaBox = () => {
	return (
		<Link to="/build" className="mk-post"> <div></div> <FaPlus /> </Link>
	)
}

export default IdeaBox;
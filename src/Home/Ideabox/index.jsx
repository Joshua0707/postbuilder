import React from 'react';
import { Link } from 'react-router-dom';
import './ideas.css';
import img from '../../Assets/publish_post.png';

const IdeaBox = () => {
	return (
		<Link to="/build" className="mk-post">
			<div>
				<img src={img} alt="make post" />
				<h1>
					Create Your Post!
				</h1>
			</div>
		</Link>
	)
}

export default IdeaBox;
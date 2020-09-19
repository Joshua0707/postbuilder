import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css'

import {
	BsPerson,
	BsDashSquare,
	BsBell,
	BsFiles,
	BsGear,
	BsArrowBarRight
	 } from 'react-icons/bs';

const Navbar = ({ location }) => {

	const [ acctDd, setAcctDd ] = React.useState(false);
	const [ navSize, setNavSize ] = React.useState(window.innerWidth);
	const [ navToggle, setNavToggle ] = React.useState(false);
	const dropElem = React.useRef(null);

	const toggleDd = () => {
		setAcctDd(state => !state);
	}

	const closeToggle = () => {
		setNavToggle(false);
		setAcctDd(false)
	}

	const eventHandler = (e) => {
		if (dropElem && dropElem.current) {
			const { left, right, bottom, top } = dropElem.current.getBoundingClientRect();
			const condition = (e.clientX < left || e.clientX > right) && (e.clientY < top || e.clientY > bottom);
			if (condition) {
				console.log(true)
				setAcctDd(false);
			}
		}
	}

	React.useEffect(() => {
		window.addEventListener('resize', (e) => {
			setNavSize(window.innerWidth);
			closeToggle();
		});
	})


	React.useEffect(() => {
		if (acctDd) {
			window.addEventListener('click', eventHandler)
		}
		return () => window.removeEventListener('click', eventHandler)
	}, [ acctDd ])


	return (
		<nav className="nv-wr">
			<div className="nv-bd">
				<Link to={'/home'}>PostHub</Link>
			</div>
			{
				navSize < 580 ? (
					<span className="nv-tg-bx">
						<span className={`nv-tg ${navToggle ? 'close' : ''}`} onClick={
							() => setNavToggle(state => !state)
						}>
							<span></span>
							<span></span>
						</span>
					</span>
				) : ''
			}
			<div className={`nv-ut ${navSize < 580 && navToggle ? 'show' : ''}`}>
				<Link to={'/home'} onClick={closeToggle}> <BsDashSquare />Dashboard</Link>
				<Link to={'/explore'} onClick={closeToggle}> <BsFiles />Explore</Link>
				<Link to={'/notification'} onClick={closeToggle}> <BsBell />Notifications</Link>
				<span className="dp-dn">
					<span onClick={toggleDd}>
						<BsPerson />
						Account
					</span>
					{
						acctDd || navSize < 580 ? (
							<div ref={dropElem}>
								<Link to={'/profile'} onClick={closeToggle} ><BsPerson />My Profile</Link>
								<Link to={'/settings'} onClick={closeToggle}><BsGear />Settings</Link>
								<Link to={'/logout'} onClick={closeToggle}><BsArrowBarRight />Logout</Link>
							</div>
						) : ''
					}
				</span>
			</div>
		</nav>
	)
}

export default Navbar;
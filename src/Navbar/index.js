import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
	FaCaretDown,
	FaDashcube,
	FaBell,
	FaUser
	} from 'react-icons/fa';

const Navbar = ({ location }) => {
	const [ acctDd, setAcctDd ] = React.useState(false);
	const toggleDd = () => {
		setAcctDd(state => !state);
	}
	return (
		<NavWrapper>
			<div className="nv-bd">
				<Link to={'/home'}>PostHub</Link>
			</div>
			<div className="nv-ut"> 
				<Link to={'/home'}> <FaDashcube />Feeds</Link>
				<Link to={'/home'}> <FaBell />Notifications</Link>
				<span className="dp-dn">
					<span onClick={toggleDd}> 
						<FaUser /> 
						Account  
					</span>
					{
						acctDd ? (
							<div>
								<Link to={'/admin'}>My Profile</Link>
								<Link to={'/admin'}>Settings</Link>
								<Link to={'/admin'}>Logout</Link>
							</div>
						) : ''
				 	}
				</span>
			</div>
		</NavWrapper>
	)
}

const NavWrapper = styled.nav`
	width: 100%;
	height: 70px;
	background: #fff;
	box-shadow: 1px 1px 3px #ddd, 3px 3px 5px #eee;

	a {
		text-decoration: none;
		color: #1b1b1b;
	}

	.nv-bd {
		display: inline-block;
		line-height: 70px;
		margin-left: 20px;
		font-size: 24px;
	}

	.nv-ut {
		float: right;
		line-height: 70px;

		a, .dp-dn {
			display: inline-block;
			margin-right: 15px;
			svg {
				margin-right: 10px;
			}
		}

		.dp-dn {
			position: relative;
			span {
				color: #1b1b1b;
				cursor: pointer;			
			}

			div {
				min-width: 160px;
				position: absolute;
				top: 60px;
				right: 0px;
				background: #fff;
				box-shadow: 1px 1px 3px #ddd, 3px 3px 5px #eee;
				a {
					width: 100%;
					display: block;
					text-align: center;
					border-sizing: border-box;
					padding: 7px;
					line-height: initial;
					color: #1b1b1b;
				}
			}
		}
	}

`

export default Navbar;
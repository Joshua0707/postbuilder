import React from 'react';
import '../user.css';
import { GoLock , GoMail} from 'react-icons/go';
import { Link } from 'react-router-dom';

const LoginForm = () => {
	return (
		<div className="login-pg">
			<form className="user-form">
				<header>
					<h1>
						Welcome Back <span className="cust-emoji">{':)'}</span>
					</h1>
					<p>
						Login to join people as they make they ideas trend.
					</p>
				</header>
				<div className="form-rl">
					<div className="input-vw">
						<span className="ico"> <GoMail /> </span>
						<input type="text" required={true} tabIndex={1}/>
						<label> Email Address </label>
					</div>
					<div className="input-vw">
						<span className="ico"> <GoLock /> </span>
						<span className="forget"> <Link to="/home" tabIndex={2}>forgot?</Link> </span>
						<input type="password" required={true} tabIndex={1} />
						<label> Password </label>
					</div>
					<div className="input-sb">
						<span> Don't have an Account? <Link to="/register">Sign Up</Link> </span>
						<button type="submit">Login</button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default LoginForm;
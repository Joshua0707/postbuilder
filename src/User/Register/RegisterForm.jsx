import React from 'react';
import '../user.css';
import { GoLock , GoMail} from 'react-icons/go';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
	return (
		<div className="register-pg">
			<form className="user-form">
				<header>
					<h1>
						Create An Account
					</h1>
					<p>
						Connect with ideas all over the world.
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
						<input type="password" required={true} tabIndex={1} />
						<label> Password </label>
					</div>
					<div className="input-sb">
						<button type="submit">Create Account</button>
					</div>
					<div className="alt-div">
						Have An Account? <Link to="/login">Login</Link>
					</div>
				</div>
			</form>
		</div>
	)
}

export default RegisterForm;
import React from 'react';
import { Link } from 'react-router-dom';

function NavbarUser(props) {
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<Link className='navbar-brand mb-0 h1' to='/'>
				Obatin
			</Link>
			<div className='collapse navbar-collapse'>
				<ul className='navbar-nav'>
					<li className='nav-item active'>
						<Link className='nav-link' to='/'>
							Store
						</Link>
					</li>

					<div>
						<li className='nav-item active'>
							<Link className='nav-link' to='/profile'>
								Profile
							</Link>
						</li>
						<li className='nav-item active' onClick={props.logOut}>
							<Link className='nav-link' to='/logout'>
								Log out
							</Link>
						</li>
					</div>

					<div>
						<li className='nav-item active'>
							<Link className='nav-link' to='/login'>
								Sign in
							</Link>
						</li>
						<li className='nav-item active'>
							<Link className='nav-link' to='/register'>
								Sign up
							</Link>
						</li>
					</div>
				</ul>
			</div>
		</nav>
	);
}

export default NavbarUser;

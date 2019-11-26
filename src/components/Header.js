import React, { Component } from 'react';
import {Link} from 'react-router-dom'

 class Header extends Component {
	render() {
		return (
			<React.Fragment>
				<header>
					<div className="container">
						<div className="row">
							<div className="col-md-6 col-12">
								<div className="home-logo">
									<a href="/"><h1>nessmovies</h1></a>
								</div>
							</div>
							<div className="col-md-6 col-12">
								<nav>
									<ul>
										<li><Link to="/">Home</Link></li>
										<li><Link to="/movies">Movies</Link></li>
										<li><Link to="/news">News</Link></li>
										<li><Link to="/Community">Community</Link></li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</header>
			</React.Fragment>
		)
	}
}
export default Header;
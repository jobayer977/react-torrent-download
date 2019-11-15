import React, { Component } from 'react';

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
										<li><a href="/">Home</a></li>
										<li><a href="/movies">Movies</a></li>
										<li><a href="/news">News</a></li>
										<li><a href="/Community">Community</a></li>
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
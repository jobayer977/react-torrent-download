import React, { Component } from 'react';

 class Footer extends Component {
	render() {
		return (
			<React.Fragment>
				<footer>
					<div className="container">
						<div className="row">
							<div className="col-md-3">
								<div className="footer-site-title">
									<img src="" alt=""/>
									<div className="home-logo">
										<h1>nessmovies</h1>
									</div>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
									<h4>Call US <span> +90294029402</span></h4>
								</div>
							</div>
							<div className="col-md-9">
								<div className="row">
									<div className="col-md-3">
										<div className="footer-item">
											<h2>Resources</h2>
											<ul>
												<li><a href="/">About</a></li>
												<li><a href="/">Blockbuster</a></li>
												<li><a href="/">Contact US</a></li>
												<li><a href="/">Forums</a></li>
												<li><a href="/">Blog</a></li>
												<li><a href="/">Help Center</a></li>
											</ul>
										</div>
									</div>
									<div className="col-md-3">
										<div className="footer-item">
											<h2>Legal</h2>
											<ul>
												<li><a href="/">Terms of Use</a></li>
												<li><a href="/">Privacy Policy</a></li>
												<li><a href="/">Security</a></li>
											</ul>
										</div>
									</div>
									<div className="col-md-3">
										<div className="footer-item">
											<h2>Account</h2>
											<ul>
												<li><a href="/">My Account</a></li>
												<li><a href="/">Warchlist</a></li>
												<li><a href="/">Collections</a></li>
												<li><a href="/">User Guide</a></li>
											</ul>
										</div>
									</div>
									<div className="col-md-3">
										<div className="footer-item">
											<h2>Newsletter</h2>
											<p>Subscribe to our newsletter system now to get latest news from us.</p>
											<input type="text" placeholder="Enter Your Query"/>
											<input type="submit" value="Send"/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</footer>
				<div className="bottom-area">
					<p>© 2020 nessmovies. All Rights Reserved. Designed by <a href="https://www.fb.com/547h1">Jobayer Hossain</a>.</p>
				</div>
			</React.Fragment>
		)
	}
}
export default Footer;
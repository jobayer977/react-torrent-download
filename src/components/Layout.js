import React, { Component } from 'react';
import axios from 'axios'

 class Layout extends Component {
 	constructor(props){
 		super(props)
 		this.state ={
 			latestMovies:[],
 			populardownload:[],
 			upComingMovie:[],
 			topRatedMovie:[],
 			popularCelebrity:[],
 			loading:true,
 		}
 	}
 	componentDidMount() {
 		axios.get('https://yts.lt/api/v2/list_movies.json?&limit=4&sort_by=year')
 			.then(response => this.setState({
 				latestMovies:response.data.data.movies
 			}))
 		axios.get('https://yts.lt/api/v2/list_movies.json?sort_by=download_count&limit=8')
 			.then(response => this.setState({
 				populardownload:response.data.data.movies
 			}))
 		axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=25d2bef9b77c25cd95e1a4d011f98dd9&language=en-US&page=1')
 			.then(response => this.setState({
 				upComingMovie:response.data.results
 			}))
 		axios.get('https://api.themoviedb.org/3/person/popular?api_key=25d2bef9b77c25cd95e1a4d011f98dd9&language=en-US&page=1')
 			.then(response => this.setState({
 				popularCelebrity:response.data.results
 			}))
 		axios.get('https://yts.lt/api/v2/list_movies.json?sort_by=rating&limit=8')
 			.then(response => this.setState({
 				topRatedMovie:response.data.data.movies
 			}))
 	}
	render() {
		const{latestMovies,populardownload,upComingMovie,topRatedMovie,popularCelebrity} = this.state
		console.log(latestMovies)
		return (
			<React.Fragment>
				
					<section className="search-wrapper">
						<div className="container">
							<div className="row">
								<div className="col-md-12">
									<div className="search-box">
										<form action="">
											<input type="text" placeholder="Search..."/>
											<input type="submit" value="Search"/>
										</form>
									</div>
								</div>
							</div>
						</div>
					</section>
					
					<section className="latest-movie-wrapper">
						<div className="container">
							<div className="social-link-wrapper">
								<div className="row">
									<div className="col-md-6">
										<h1 className="title">Latest movies</h1>
									</div>
									<div className="col-md-6 text-right">
										<h4>Follow US:</h4>
										<ul>
											<li><a href="/"><i className="fab fa-facebook"></i></a></li>
											<li><a href="/"><i className="fab fa-twitter"></i></a></li>
											<li><a href="/"><i className="fab fa-instagram"></i></a></li>
										</ul>
									</div>
								</div>
							</div>
							<div className="row">
								{
									latestMovies.map((movie,i) => (
										<div className="col-lg-3 col-md-6 col-sm-12 col-12" key={i}>
											<div className="latest-item">
												<div className="thumnail">
													<img src={movie.large_cover_image} alt=""/>
												</div>
												<div className="sort-info">
													{movie.genres.map((gen,i)=> (<div className="genres" key={i}><span  className={gen}>{gen}</span></div>))}
													<h2>{movie.title_english}</h2>
													<h4><i className="fas fa-star"></i> {movie.rating} <span>/10</span></h4>
												</div>
												<a href={`/movie/${movie.slug}?id=${movie.id}`}>View details</a>
											</div>
										</div>
										))
								}
							</div>
						</div>
					</section>
					<section className="body-content">
						<div className="container">
							
								<div className="row">
									<div className="col-md-9">
										<div className="tranding-movies">
											<h1 className="title">popular   download</h1>
											<div className="row">
												{
													populardownload.map((movie,i) => (
														<div className="col-md-3" key={i}>
															<div className="tranding-list-item">
																<img src={movie.large_cover_image} alt=""/>
																<div className="t-movie-info">
																	{movie.genres.slice(0,2).map((gen,i)=> (<div className="genres" key={i}><span  className={gen}>{gen}</span></div>))}
																	<h2>{movie.title}</h2>
																	<h4><i className="fas fa-star"></i> {movie.rating} <span>/10</span></h4>
																</div>
																<a href={`/movie/${movie.slug}?id=${movie.id}`}>View details</a>
															</div>
														</div>
														))
												}
											</div>
										</div>
									</div>
									<div className="col-md-3">
										<div className="upcoming tranding-celebrities ">
											<h1 className="title">upcoming</h1>
											<ul>
												{
													upComingMovie.slice(0,5).map((movie,i) => (
															<li key={i}>
																<img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} alt=""/>
																<h4>{movie.title}<span>Relese {movie.release_date}</span></h4>
															</li>
														))
												}
											</ul>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-9">
										<div className="tv-movies">
											<h1 className="title">Top rated</h1>
											<div className="row">		
												{
													topRatedMovie.map((movie,i) => (
														<div className="col-md-3" key={i}>
															<div className="tranding-list-item">
																<img src={movie.large_cover_image} alt=""/>
																<div className="t-movie-info">
																	{movie.genres.slice(0,2).map((gen,i)=> (<div className="genres" key={i}><span  className={gen}>{gen}</span></div>))}
																	<h2>{movie.title}</h2>
																	<h4><i className="fas fa-star"></i>{movie.rating} <span> /10</span></h4>
																</div>
																<a href={`/movie/${movie.slug}?id=${movie.id}`}>read more</a>
															</div>
														</div>
														))
												}
											</div>
										</div>
									</div>
									<div className="col-md-3">
										<div className="tranding-celebrities">
											<h1 className="title">Popular Celebrity</h1>
											<ul>
												{
													popularCelebrity.slice(0,7).map((person,i) => (
															<li key={i}>
																<img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${person.profile_path}`} alt=""/>
																<h4>{person.name}<span> popularity {person.popularity}</span></h4>
															</li>
														))
												}
											</ul>
										</div>
									</div>
									
								</div>
								
								
									
								
							
						</div>
					</section>
							
				
			</React.Fragment>
		)
	}
}
export default Layout;

		// <section className="in-theater-movies-list">
		// 				<div className="container">
		// 				<h1 className="title">In theater</h1>
		// 					<div className="row">
		// 						<div className="col-md-8">
		// 							<div className="big-thum">
		// 								<img src="https://placehold.it/400x700" alt=""/>
		// 							</div>
		// 						</div>
		// 						<div className="col-md-4">
		// 							<div className="theater-movies-order">
		// 								<ul>
		// 									<li>
		// 										<img src="https://placehold.it/200x100" alt=""/>
		// 										<h4>Exclusive insterves <span>2.44</span></h4>
		// 									</li>
		// 									<li>
		// 										<img src="https://placehold.it/200x100" alt=""/>
		// 										<h4>Exclusive insterves <span>2.44</span></h4>
		// 									</li>
		// 									<li>
		// 										<img src="https://placehold.it/200x100" alt=""/>
		// 										<h4>Exclusive insterves <span>2.44</span></h4>
		// 									</li>
		// 									<li>
		// 										<img src="https://placehold.it/200x100" alt=""/>
		// 										<h4>Exclusive insterves <span>2.44</span></h4>
		// 									</li>
		// 									<li>
		// 										<img src="https://placehold.it/200x100" alt=""/>
		// 										<h4>Exclusive insterves <span>2.44</span></h4>
		// 									</li>
		// 								</ul>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</section>
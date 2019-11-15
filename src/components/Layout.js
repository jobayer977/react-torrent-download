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
 			searchQuery:'',
 			searchInfo:[],
 			searching:false,
 			searchPaginatio:2,
 			searchPageItemShow:0,
 			loading:true
 		}
 	}
 	componentDidMount() {
 		axios.get('https://yts.lt/api/v2/list_movies.json?&limit=4&sort_by=year')
 			.then(response => this.setState({
 				latestMovies:response.data.data.movies,
 				loading:false
 			}))
 		axios.get('https://yts.lt/api/v2/list_movies.json?sort_by=download_count&limit=8')
 			.then(response => this.setState({
 				populardownload:response.data.data.movies,
 				loading:false
 			}))
 		axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=25d2bef9b77c25cd95e1a4d011f98dd9&language=en-US&page=1')
 			.then(response => this.setState({
 				upComingMovie:response.data.results,
 				loading:false
 			}))
 		axios.get('https://api.themoviedb.org/3/person/popular?api_key=25d2bef9b77c25cd95e1a4d011f98dd9&language=en-US&page=1')
 			.then(response => this.setState({
 				popularCelebrity:response.data.results,
 				loading:false
 			}))
 		axios.get('https://yts.lt/api/v2/list_movies.json?sort_by=rating&limit=8')
 			.then(response => this.setState({
 				topRatedMovie:response.data.data.movies,
 				loading:false
 			}))
 	}
 	onChangeHandler = (e) => {
 		this.setState({
 			searchQuery:e.target.value
 		})
 		 e.preventDefault();
 	}
 	searchSubmit = (e) => {
 		axios.get(`https://yts.lt/api/v2/list_movies.json?query_term=${this.state.searchQuery}&limit=12`)
 			.then(response => this.setState({
 				latestMovies:response.data.data.movies,
 				searchInfo:response.data.data,
 				searchPageItemShow:response.data.data.movie_count,
 				searching:true,
 			}))
 		e.preventDefault();
 	}
 	nextSearchPage = (e) => {
 		axios.get(`https://yts.lt/api/v2/list_movies.json?query_term=${this.state.searchQuery}&limit=12&page=${this.state.searchPaginatio}`)
 			.then(response => this.setState({
 				latestMovies:response.data.data.movies,
 				searchInfo:response.data.data,
 				searching:true,
 				searchPaginatio:this.state.searchPaginatio +1,
 				searchPageItemShow:this.state.searchPageItemShow - 12
 			}))
 		window.scrollTo({
            top: 150,
            behavior: 'smooth'
        })
 		e.preventDefault();
 	}
 	


	render() {
		const{latestMovies,populardownload,upComingMovie,topRatedMovie,popularCelebrity,searchQuery,searching,searchPageItemShow,loading} = this.state
		
		var headingStatus = ''
		var searchPageStatus = ''
		if (searching === false) {
			headingStatus = 'Latest movies'
			searchPageStatus = ''
		} else {
			headingStatus = <div className="searchInfo">You Searching {searchQuery}  found {searchPageItemShow && searchPageItemShow} Movie</div>
			if (searchPageItemShow > 12) {
				searchPageStatus = <button className="loadbtn" onClick={this.nextSearchPage}>More {searchPageItemShow}</button>
			} else {
				searchPageStatus = <a href="/"><button className="loadbtn">Back to Home</button></a>
			}
		}
		var loadingStatus = ''
		if (loading === true) {
			loadingStatus = <div className="loading"><h1><i className="fa fa-spinner fa-pulse"></i></h1></div>
		} else {
			loadingStatus = ''
		}
		return (
			<React.Fragment>
				{loadingStatus}
					<section className="search-wrapper">
						<div className="container">
							<div className="row">
								<div className="col-md-12">
									<div className="search-box">
										<form onSubmit={this.searchSubmit}>
											<input type="text" placeholder="Search..."  onChange={this.onChangeHandler}/>
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
									<div className="col-md-6 col-sm-6 col-5">
										<h1 className="title">{headingStatus}</h1>
									</div>
									<div className="col-md-6 col-sm-6 col-7 text-right">
										<h4>Follow US:</h4>
										<ul>
											<li><a href="/"><i className="fa fa-facebook"></i></a></li>
											<li><a href="/"><i className="fa fa-twitter"></i></a></li>
											<li><a href="/"><i className="fa fa-instagram"></i></a></li>
										</ul>
									</div>
								</div>
							</div>
							<div className="row">
								{
									latestMovies && latestMovies.map((movie,i) => (
										<div className="col-lg-3 col-md-6 col-sm-6 col-12" key={i}>
											<div className="latest-item">
												<div className="thumnail">
													<img src={movie.large_cover_image} alt=""/>
												</div>
												<div className="sort-info">
													{movie.genres.slice(0,3).map((gen,i)=> (<div className="genres" key={i}><span  className={gen}>{gen}</span></div>))}
													<h2>{movie.title_english} <span>{movie.year}</span></h2>
													<h4><i className="fa fa-star"></i> {movie.rating} <span>/10</span></h4>
												</div>
												<a href={`/movie/${movie.slug}?id=${movie.id}`}>View details</a>
											</div>
										</div>
										))
								}

							</div>
							<div className="row ">
									<div className="col-md-12 text-center">
										{searchPageStatus}
									</div>
							</div>
						</div>
					</section>
					<section className="body-content">
						<div className="container">
							
								<div className="row">
									<div className="col-lg-9 col-md-8">
										<div className="tranding-movies">
											<div className="row">
												<div className="col-md-6 col-sm-6 col-7">
													<h1 className="title">popular   download</h1>
												</div>
												<div className="col-md-6 col-sm-6 col-5">
													<a href="/popular"><h2 className="view-more text-right">View All </h2></a>
												</div>
											</div>
											<div className="row">
												{
													populardownload.map((movie,i) => (
														<div className="col-lg-3 col-md-4 col-sm-6 col-12" key={i}>
															<div className="tranding-list-item">
																<img src={movie.large_cover_image} alt=""/>
																<div className="t-movie-info">
																	{movie.genres.slice(0,2).map((gen,i)=> (<div className="genres" key={i}><span  className={gen}>{gen}</span></div>))}
																	<h2>{movie.title} <span>{movie.year}</span></h2>
																	<h4><i className="fa fa-star"></i> {movie.rating} <span>/10</span></h4>
																</div>
																<a href={`/movie/${movie.slug}?id=${movie.id}`}>View details</a>
															</div>
														</div>
														))
												}
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-md-4">
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
									<div className="col-lg-9 col-md-12">
										<div className="tv-movies">
											
											<div className="row">
												<div className="col-md-6 col-sm-7 col-7">
													<h1 className="title">Top rated</h1>
												</div>
												<div className="col-md-6 col-sm-5 col-5">
													<a href="/top"><h2 className="view-more text-right">View All </h2></a>
												</div>
											</div>
											<div className="row">		
												{
													topRatedMovie.map((movie,i) => (
														<div className="col-md-3 col-sm-6 col-12" key={i}>
															<div className="tranding-list-item">
																<img src={movie.large_cover_image} alt=""/>
																<div className="t-movie-info">
																	{movie.genres.slice(0,2).map((gen,i)=> (<div className="genres" key={i}><span  className={gen}>{gen}</span></div>))}
																	<h2>{movie.title}  <span>{movie.year}</span></h2>
																	<h4><i className="fa fa-star"></i>{movie.rating} <span> /10</span></h4>
																</div>
																<a href={`/movie/${movie.slug}?id=${movie.id}`}>read more</a>
															</div>
														</div>
														))
												}
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-md-12">
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
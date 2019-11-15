import React, { Component } from 'react';
import axios from 'axios'

 class Movies extends Component {
 	constructor(props){
 		super(props)
 		this.state ={
 			populardownload:[],
 			paginatio:2,
 			paginatioPageItemShow:0,
 			loading:true,
 			fillterStatus:false,
 			searchQuery:'',
 			genres:'Action',
 			rating:4,
 			sortBy:'Year',
 		}
 	}
 	// JSON get
 	componentDidMount() {
 		axios.get('https://yts.lt/api/v2/list_movies.json?sort_by=download_count&limit=30')
 			.then(response => this.setState({
 				populardownload:response.data.data.movies,
 				paginatioPageItemShow:response.data.data.movie_count,
 				loading:false
 			}))
 	}
                                                                                                                                                                                      
 	// Filter Handler
 	changeHandler = (e) => {
 		this.setState({
			[e.target.name]:e.target.value
		})
 	}

 	onSubmit = (e) => {
 		axios.get(`https://yts.lt/api/v2/list_movies.json?query_term=${this.state.searchQuery}&genre=${this.state.genres}&minimum_rating=${this.state.rating}&sort_by=${this.state.sortBy}&limit=30`)
 			.then(response => this.setState({
 				populardownload:response.data.data.movies,
 				paginatioPageItemShow:response.data.data.movie_count,
 				// loading:true,
 				fillterStatus:true,
 				loading:false
 			}))
 		e.preventDefault()
 	}





	// Load More Button
 	nextPage = (e) => {
 		axios.get(`https://yts.lt/api/v2/list_movies.json?sort_by=download_count&limit=30&page=${this.state.paginatio}`)
 			.then(response => this.setState({
 				populardownload:response.data.data.movies,
 				paginatio:this.state.paginatio +1,
 				paginatioPageItemShow:this.state.paginatioPageItemShow - 30,
 				loading:false
 			}))
 		window.scrollTo({
            top: 150,
            behavior: 'smooth'
        })
 		e.preventDefault();
 	}




	render() {
		const{populardownload,paginatioPageItemShow,loading,fillterStatus} = this.state
		// console.log(this.state)
		var loadMoreStatus = ''
		if (paginatioPageItemShow < 30) {
			loadMoreStatus = ''
		} else {
			loadMoreStatus = <button className="loadbtn" onClick={this.nextPage}>More {paginatioPageItemShow} </button>
		}
		var loadingStatus  = ''
		if (loading === true) {
			loadingStatus = <div className="loading"><h1><i className="fa fa-spinner fa-pulse"></i></h1></div>
		} else {
			loadingStatus = ''
		}
		var filterMarkup = ''
		if (fillterStatus === true) {
			filterMarkup = <div className="filter-movies-status"><p>Found <span>{paginatioPageItemShow}</span> movies in total</p></div>
		} else {
			filterMarkup =''
		}
		return (
			<React.Fragment>
			{loadingStatus}
			
				<section className="popular">
						<div className="row">
							<div className="container">
								<div className="col-md-12">
									<div className="page-title">Movies</div>
								</div>
							</div>
						</div>
						<div className="filter-wrapper">
							<div className="container">
								<form onSubmit={this.onSubmit}>
									<div className="row text-center">
										<div className="col-md-4">
											<div className="filter-item">
												<label htmlFor="Search">Search</label>
												<input type="text" name="searchQuery" onChange={this.changeHandler} placeholder="Search Keyword"/>
											</div>
											
										</div>
										<div className="col-md-2">
											<div className="filter-item">
												<label htmlFor="genres">genres</label>
												<select name="genres" onChange={this.changeHandler}>
														<option value="all">All</option>
														<option value="action">Action</option>
														<option value="adventure">Adventure</option>
														<option value="animation">Animation</option>
														<option value="biography">Biography</option>
														<option value="comedy">Comedy</option>
														<option value="crime">Crime</option>
														<option value="documentary">Documentary</option>
														<option value="drama">Drama</option>
														<option value="family">Family</option>
														<option value="fantasy">Fantasy</option>
														<option value="film-noir">Film-Noir</option>
														<option value="game-show">Game-Show</option>
														<option value="history">History</option>
														<option value="horror">Horror</option>
														<option value="music">Music</option>
														<option value="musical">Musical</option>
														<option value="mystery">Mystery</option>
														<option value="news">News</option>
														<option value="reality-tv">Reality-TV</option>
														<option value="romance">Romance</option>
														<option value="sci-fi">Sci-Fi</option>
														<option value="sport">Sport</option>
														<option value="talk-show">Talk-Show</option>
														<option value="thriller">Thriller</option>
														<option value="war">War</option>
														<option value="western">Western</option>
												</select>
											</div>

											
										</div>
										<div className="col-md-2">
											<div className="filter-item">
												<label htmlFor="rating">Rating</label>
												<select name="rating" onChange={this.changeHandler}>
													<option value="0">All</option>
													<option value="9">9+</option>
													<option value="8">8+</option>
													<option value="7">7+</option>
													<option value="6">6+</option>
													<option value="5">5+</option>
													<option value="4">4+</option>
													<option value="3">3+</option>
													<option value="2">2+</option>
													<option value="1">1+</option>
												</select>
											</div>
											
										</div>
										<div className="col-md-2">
											<div className="filter-item">
												<label htmlFor="sort_by">sort_by</label>
												<select name="sortBy" onChange={this.changeHandler}>
													<option value="latest">Latest</option>
													<option value="date_added">Oldest</option>
													<option value="seeds">Seeds</option>
													<option value="peers">Peers</option>
													<option value="year">Year</option>
													<option value="rating">Rating</option>
													<option value="like_count">Likes</option>
													<option value="title">Alphabetical</option>
													<option value="download_count">Downloads</option>
												</select>
											</div>
											
										</div>
										<div className="col-md-2">
											<input type="submit" value="Submit"/>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="movie-list-wrapper">
							<div className="container">
							<div className="row">
								<div className="col-md-12">
									{filterMarkup}
								</div>
							</div>
								<div className="row">
									
									{
										populardownload && populardownload.map((movie,i) => (
											<div className="col-md-2" key={i}>
												<div className="moive-item-wrapper">
													<div className="tranding-list-item">
														<img src={movie.large_cover_image} alt=""/>
														<div className="t-movie-info">
															{movie.genres.slice(0,2).map((gen,i)=> (<div className="genres" key={i}><span  className={gen}>{gen}</span></div>))}
															<h4><i className="fa fa-star"></i>{movie.rating} <span> /10</span></h4>
														</div>
														<a href={`/movie/${movie.slug}?id=${movie.id}`}>View details</a>
														
													</div>
													<div className="movie-info">
													
														<h3>{movie.title.length < 20 ? movie.title : movie.title.slice(0,20)+'...'}<span>{movie.year}</span></h3>
													
													</div>
												</div>
											</div>
											))
									}
								</div>
								<div className="row">
									<div className="col-md-12">{loadMoreStatus}</div>
								</div>
							</div>
						</div>
					
				</section>
			</React.Fragment>
		)
	}
}
export default Movies;

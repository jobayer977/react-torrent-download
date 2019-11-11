import React, { Component } from 'react';
import axios from 'axios'

 class Popular extends Component {
 	constructor(props){
 		super(props)
 		this.state ={
 			populardownload:[]
 		}
 	}
 	componentDidMount() {
 		axios.get('https://yts.lt/api/v2/list_movies.json?sort_by=download_count&limit=30')
 			.then(response => this.setState({
 				populardownload:response.data.data.movies
 			}))
 	}
	render() {
		const{populardownload} = this.state
		return (
			<React.Fragment>
				<section className="popular">
					
						<div className="row">
							<div className="container">
								<div className="col-md-12">
									<div className="page-title">Popular Movies</div>
								</div>
							</div>
						</div>
						<div className="movie-list-wrapper">
							<div className="container">
								<div className="row">
									{
										populardownload.map((movie,i) => (
											<div className="col-md-2" key={i}>
												<div className="tranding-list-item">
													<img src={movie.large_cover_image} alt=""/>
													<div className="t-movie-info">
														{movie.genres.slice(0,2).map((gen,i)=> (<div className="genres" key={i}><span  className={gen}>{gen}</span></div>))}
														<h2>{movie.title} <span>{movie.year}</span></h2>
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
					
				</section>
			</React.Fragment>
		)
	}
}
export default Popular;
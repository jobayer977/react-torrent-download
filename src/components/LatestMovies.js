import React, { Component } from 'react';

LatestMovies = () => {
	return (
		
	)
}
export default LatestMovies;













// <React.Fragment>
// 			{
// 				latestMovies && latestMovies.map((movie,i) => (
// 					<div className="col-lg-3 col-md-6 col-sm-6 col-12" key={i}>
// 						<div className="latest-item">
// 							<div className="thumnail">
// 								<img src={movie.large_cover_image} alt=""/>
// 							</div>
// 							<div className="sort-info">
// 								{movie.genres.slice(0,3).map((gen,i)=> (<div className="genres" key={i}><span  className={gen}>{gen}</span></div>))}
// 								<h2>{movie.title_english} <span>{movie.year}</span></h2>
// 								<h4><i className="fa fa-star"></i> {movie.rating} <span>/10</span></h4>
// 							</div>
// 							<a href={`/movie/${movie.slug}?id=${movie.id}`}>View details</a>
// 						</div>
// 					</div>
// 					))
// 			}
// 		</React.Fragment>
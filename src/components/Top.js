import React, { Component } from 'react';
import axios from 'axios'

 class Top extends Component {
 	constructor(props){
 		super(props)
 		this.state ={
 			topRatedMovie:[],
 			paginatio:2,
 			paginatioPageItemShow:0,
 			loading:true
 		}
 	}
 	componentDidMount() {
 		axios.get('https://yts.lt/api/v2/list_movies.json?sort_by=rating&limit=30')
 			.then(response => this.setState({
 				topRatedMovie:response.data.data.movies,
 				paginatioPageItemShow:response.data.data.movie_count,
 				loading:false
 			}))
 	}
 	nextPage = (e) => {
 		axios.get(`https://yts.lt/api/v2/list_movies.json?sort_by=rating&limit=30&page=${this.state.paginatio}`)
 			.then(response => this.setState({
 				topRatedMovie:response.data.data.movies,
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
		const{topRatedMovie,paginatioPageItemShow,loading} = this.state
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
		return (
			<React.Fragment>
			{loadingStatus}
				<section className="top">
					
						<div className="row">
							<div className="container">
								<div className="col-md-12">
									<div className="page-title">Top Rated Movies</div>
								</div>
							</div>
						</div>
						<div className="movie-list-wrapper">
							<div className="container">
								<div className="row">
									{
										topRatedMovie.map((movie,i) => (
											<div className="col-md-2" key={i}>
												<div className="moive-item-wrapper">
													<div className="tranding-list-item">
														<img src={movie.large_cover_image} alt=""/>
														<div className="t-movie-info">
															{movie.genres.slice(0,2).map((gen,i)=> (<div className="genres" key={i}><span  className={gen}>{gen}</span></div>))}
															<h4><i className="fas fa-star"></i>{movie.rating} <span> /10</span></h4>
														</div>
														<a href={`/movie/${movie.slug}?id=${movie.id}`}>read more</a>
														
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
export default Top;
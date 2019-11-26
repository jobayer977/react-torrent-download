import React, { Component } from 'react';
import './App.css'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Header from './components/Header'
import Layout from './components/Layout'
import Footer from './components/Footer'
import Movie from './components/Movie'
import Popular from './components/Popular'
import Top from './components/Top'
import Movies from './components/Movies'
import Test from './components/Test'

// import 'bootstrap/dist/css/bootstrap.min.css';


 class App extends Component {
  render() {
    return (
       <Router>
          <React.Fragment>
              <Header/>
                <Route path="/" exact component={Layout}/>
                <Route path="/movie"  component={Movie}/>
                <Route path="/movies"  component={Movies}/>
                <Route path="/popular"  component={Popular}/>
                <Route path="/top"  component={Top}/>
              <Footer/>
          </React.Fragment>
       </Router>
    )
  }
}
export default App


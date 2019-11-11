import React, { Component } from 'react';
import './App.css'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Header from './components/Header'
import Layout from './components/Layout'
import Footer from './components/Footer'
import Movie from './components/Movie'
 class App extends Component {
  render() {
    return (
       <Router>
          <React.Fragment>
              <Header/>
                <Route path="/" exact component={Layout}/>
                <Route path="/movie"  component={Movie}/>
              <Footer/>
          </React.Fragment>
       </Router>
    )
  }
}
export default App


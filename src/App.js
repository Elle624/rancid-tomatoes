import React, { Component } from 'react';
import './App.css';
import Movies from './components/Movies';
import ChosenMovie from './components/ChosenMovie';
import { apiCalls } from './apiCalls';
import { Route } from 'react-router-dom';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import Error from './components/Error';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      queries: [],
      watchList: [],
      error: '',
      loaded: false
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    Promise.all([apiCalls.allMovies(), apiCalls.getWatchList()])
      .then(data => {
        const newDataSet = data.reduce((allData, dataSet) => {
          return allData = { ...allData, ...dataSet }
        }, {})
        this.setState({
          movies: newDataSet.movies,
          watchList: newDataSet.watchListIds,
          loaded: true
        })
      })
      .catch(err => this.setState({
        error: err.message
      }))
  }

  getSortedMovies = (sortedMovies) => {
    this.setState({
      queries: sortedMovies
    })
  }

  addToWatchList = (id) => {
    apiCalls.addToWatchList(id);
  }

  render() {
    const { movies, queries, error, loaded } = this.state;
    const displayMovies = queries.length ? queries : movies;
    return (
      <main className='App'>
        {error && <Error />}
        {!loaded && <Loading />}
        <Route path='/' exact
          render={() =>
            <Navigation
              movies={displayMovies}
              getSortedMovies={this.getSortedMovies}
            />
          } />

        <Route path='/' exact
          render={() =>
            <Movies
              movies={displayMovies}
              addToWatchList={this.addToWatchList}
            />
          } />

        <Route path='/movie/:id' component={ChosenMovie} />
      </main>
    )
  }
}

export default App;


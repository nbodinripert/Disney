import React, { Component } from 'react';

// components
import Header from './components/Header';
import CompanyContainer from './components/CompanyContainer';
import MovieContainer from './components/MovieContainer';
import SuggestionContainer from './components/SuggestionContainer';

// antdesign
import 'antd/dist/antd.css';
import { Spin, Row, Col } from 'antd';

// js
import MoviesProvider from './js/MoviesProvider';
import CompaniesProvider from './js/CompaniesProvider';

// stylesheets
import './stylesheets/DisneyPage.css'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.moviesProvider = new MoviesProvider();
    this.companiesProvider = new CompaniesProvider();
  }

  state = {
    movies: [],
    hilightedMovie: null,
    newMovies: [],
    suggestions: [],
    loading: true
  }

  async componentDidMount() {
    try {
      await this.getMovies();
    } catch(error) {
      console.log(error);
    }
  }

  async getMovies() {
    try {
      let movies = await this.moviesProvider.getMovies();
      let hilightedMovie = this.moviesProvider.getHilightedMovie(movies);
      let newMovies = this.moviesProvider.getNewMovies(movies);
      let suggestions = this.moviesProvider.getSuggestions(movies);

      this.setState({
        movies,
        hilightedMovie,
        newMovies,
        suggestions,
        loading: false
      });
    } catch(error) {
      console.log(error);
    }
  }

  renderLoadingView() {
    return (
      <div className="progressView">
        <Spin size="large" />
      </div>
    );
  }

  renderCompaniesContainer() {
    const companiesContainer = this.companiesProvider.companies.map(company => {
      return (
          <CompanyContainer
            key={company.name}
            name={company.name}
            img={company.img}
          />
        );
    });
    
    return (
        <Row type="flex" justify="space-between" className="section">
          {companiesContainer}
        </Row>
    );
  }

  renderMoviesContainer() {
    const moviesContainer = this.state.newMovies.map(movie => {
      return (
        <Col type="flex" xs={7} lg={3} key={movie.id}>
          <MovieContainer
            key={movie.id}
            id={movie.id}
            img={movie.poster}
          />
        </Col>
      );
    });

    return (
      <div className="section">
        <h3>Nouveautés</h3>
        <Row type="flex" gutter={[16,16]} justify="space-between">
          {moviesContainer}
        </Row>
      </div>
    );
  }

  renderSuggestionsContainer() {
    const suggestionContainers = this.state.suggestions.map(movie => {
      return (
        <SuggestionContainer
          key={movie.id}
          id={movie.id}
          img={movie.cover}
        />
      );
    });

    return (
      <div className="section">
        <h3>Suggestions</h3>
        <Row type="flex" gutter={[16,16]} justify="space-between">
          {suggestionContainers}
        </Row>
      </div>
      
    );
  }

  renderFinalView() {
    return (
      <div>
        <div id="hilightedMovieContainer">
          <img src={this.state.hilightedMovie.cover} alt="hilightedMovieCover"/>
        </div>
        {this.renderCompaniesContainer()}
        {this.renderMoviesContainer()}
        {this.renderSuggestionsContainer()}
      </div>
    );
  }

  render() {
    return (
      <div className="disneyPage">
        <Header/>
        {!this.state.loading ? this.renderFinalView() : this.renderLoadingView()}
      </div>
    );
  }
}

export default App;
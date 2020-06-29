import React, { Component } from 'react'

// components
import Header from '../components/Header';
import CompanyCatalogHeader from '../components/CompanyCatalogHeader';
import MovieContainer from '../components/MovieContainer';

// antdesign
import 'antd/dist/antd.css';
import { Spin, Row, Col } from 'antd';

// js
import '../stylesheets/DisneyPage.css'
import MoviesProvider from '../js/MoviesProvider';

// stylesheets
import '../stylesheets/CompanyCatalog.css';

export default class CompanyCatalog extends Component {
    constructor(props) {
        super(props);
        this.moviesProvider = new MoviesProvider();
    }

    state = {
        movies: [],
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
        let movies = await this.moviesProvider.getCompanyMovies(this.props.match.params.id);
  
        this.setState({
          movies,
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

    renderFinalView() {
      const moviesContainer = this.state.movies.map(movie => {
        return (
          <Col type="flex" xs={12} sm={6} lg={4} className="section">
            <div id="companyCatalogMovieContainer">
              <MovieContainer
                key={movie.id}
                id={movie.id}
                img={movie.poster}
              />
            </div>
          </Col>
        );
      });

      return(
        <Row type="flex" gutter={[16,16]}>
          {moviesContainer}
        </Row>
      );
    }

    render() {
        return (
            <div className="disneyPage">
                <Header/>
                <CompanyCatalogHeader img={`logo-${this.props.match.params.id}.png`}/>
                {this.state.loading ? this.renderLoadingView() : this.renderFinalView()}
            </div>
        )
    }
}

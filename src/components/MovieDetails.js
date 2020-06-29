import React, { Component } from 'react'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// antd
import { Spin, Modal, Button } from 'antd';

// components
import Header from '../components/Header';

// js
import MoviesProvider from '../js/MoviesProvider';

// stylesheets
import '../stylesheets/DisneyPage.css'
import '../stylesheets/MovieDetails.css';

library.add(faPlayCircle);

export default class MovieDetails extends Component {
    constructor(props) {
        super(props);
        this.moviesProvider = new MoviesProvider();
    }

    state = {
        movie: null,
        loading: true,
        isModalVisible: false
    }

    async componentDidMount() {
        try {
          await this.getMovie();
        } catch(error) {
          console.log(error);
        }
    }

    async getMovie() {
        try {
            let movie = await this.moviesProvider.getMovie(this.props.match.params.id);
            this.setState({
                movie,
                loading: false
            });
        } catch(error) {
          console.log(error);
        }
    }

    onPlayClick() {
        this.setState({
            visible: true
        });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    };

    onCompanyBtnClick() {
        this.props.history.push(`/company/${this.state.movie.companyLink}`);
    }

    renderLoadingView() {
        return (
          <div className="progressView">
            <Spin size="large" />
          </div>
        );
      }

    renderFinalView() {
        return (
            <div id="movieDetailsMainContainer">
                <div id="movieDetailsImgContainer">
                    <img src={this.state.movie.poster} alt="" id="movieDetailsImgPoster"/>
                    <img src={this.state.movie.cover} alt="" id="movieDetailsImgCover"/>
                    <FontAwesomeIcon icon={"play-circle"} id="playIcon" onClick={() => this.onPlayClick()}/>
                </div>
                <div id="movieDetailsDescriptionContainer">
                    <h1>{this.state.movie.title}</h1>
                    <Button id="companyBtn" onClick={() => this.onCompanyBtnClick()}>{this.state.movie.company}</Button>
                    <p>{this.state.movie.description}</p>
                </div>
                <Modal
                    title={this.state.movie.title}
                    visible={this.state.visible}
                    okButtonProps={{visible: false}}
                    footer={null}
                    onCancel={this.handleCancel}
                    width="100%"
                    bodyStyle={{
                        backgroundColor:"#444750"
                    }}
                    centered
                    style={{
                        maxHeight:"100vh"
                    }}>
                    <iframe src={this.state.movie.video} title={this.state.movie.title}>
                    </iframe>
                </Modal>
            </div>
        );
    }

    render() {
        return (
            <div className="disneyPage">
                <Header/>
                {this.state.loading ? this.renderLoadingView() : this.renderFinalView()}
            </div>
        )
    }
}

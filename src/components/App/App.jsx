import React, { Component } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar';

import { ColorRing } from 'react-loader-spinner';

import css from './App.module.css'

import axios from 'axios';


 class App extends Component {
  state = {
    query: '',
    page: 1,
    totalPages: 1,
    images: [],
    isLoading: false,
    isModalOpen: false,
    largeImageUrl: '',
  };
   makeApiCall(query, page) {
    if (page > this.state.totalPages && page !== 1) {
      return;
    }
    const PER_PAGE = 12;
    const API_KEY = '39726454-f4ec8b577ca1a4ed4aebbc524';
     const searchUrl = `https://pixabay.com/api/?q=${encodeURIComponent(
       query
     )}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;

    this.setState({ isLoading: true });
    axios.get(searchUrl).then(response => {
      const totalPages = Math.round(response.data.totalHits / PER_PAGE);
      this.updateState(response.data.hits, totalPages, true);
      this.setState({ isLoading: false });
    });
  }

   handleSearch = searchValue => {
    if (searchValue !== '') {
      if (searchValue !== this.state.query) {
        this.setState({ query: searchValue, page: 1, images: [] });
      } else {
        this.setState({ query: searchValue }, () => {});
      }
    }
   };

   updateState(images, totalPages, add = false) {
    if (add) {
      this.setState(prevState => ({
        totalPages, images: [...prevState.images, ...images],
      }));
    } else {
      this.setState({ totalPages, images });
    }
   }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

   handleImageClick = largeImageUrl => {
     this.setState({
       largeImageUrl,
       isModalOpen: true,
     });
   };

   handleModalClickClose = event => {
     if (event.target.id === 'modal' && this.state.isModalOpen) {
       this.setState({
         isModalOpen: false,
       });
     }
   };

   handleModalClose = () => {
     this.setState({
       isModalClose: false,
     });
   };
   
handleKeyPress = event => {
  if (event.key === 'Escape' && this.state.isModalOpen) {
    this.setState({
      isModalOpen: false,
    });
  }
};

   getImagesFromUrl(searchUrl) {
    axios.get(searchUrl).then(response => {
      const totalPages = Math.round(response.data.totalHits / 12);
      this.setState({ totalPages, images: response.data.hits });
    });
   }
   
  fetchMoreImages = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
   };
   
  componentDidUpdate(prevProps,prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.makeApiCall(this.state.query, this.state.page);
    }
   }
   
   render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery
          images={this.state.images}
          onModalOpen={this.handleImageClick}
        />
        {this.state.isModalOpen && (
          <Modal
            largeImageUrl={this.state.largeImageUrl}
            onClose={this.handleModalClose}
            onClickClose={this.handleModalClickClose}
            id={this.state.images.id}
          />
        )}
          {this.state.isLoading && (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{ margin: '0 auto' }}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )}
        {this.state.totalPages > 1 &&
          this.state.page < this.state.totalPages && (
            <Button getMoreImage={this.fetchMoreImages} />
          )}
      </div>
    );
  }
}
export default App;
import {useEffect, useState } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar';

import { ColorRing } from 'react-loader-spinner';

import css from './App.module.css'

import axios from 'axios';


const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageUrl, setlargeImageUrl] = useState('');
  
  useEffect(() => {
    const makeApiCall = () => {
      if (!query) {
        return;
      }
    const PER_PAGE = 12;
    const API_KEY = '39726454-f4ec8b577ca1a4ed4aebbc524';
    const searchUrl = `https://pixabay.com/api/?q=${encodeURIComponent(
      query
    )}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;

    setIsLoading(true);
    axios.get(searchUrl).then(response => {
      const totalPages = Math.round(response.data.totalHits / PER_PAGE);
      const loadedImages = response.data.hits;
      setTotalPages(totalPages);
      setImages(prevImages => [...prevImages, ...loadedImages]);
      setIsLoading(true);
    });
  };
    makeApiCall();
  }, [query, page]);

   const handleSearch = searchValue => {
    if (searchValue !== '') {
      if (searchValue !== query) {
        setQuery(searchValue);
        setPage(1);
        setImages([]);
      } else {
       setQuery(searchValue);
      }
    }
   };

  //  const updateState(images, totalPages, add = false) {
  //   if (add) {
  //     this.setState(prevState => ({
  //       totalPages, images: [...prevState.images, ...images],
  //     }));
  //   } else {
  //     setTotalPages(images);
  //   }
  //  }

  //  const  componentDidMount() {
  //       document.addEventListener('keydown', this.handleKeyPress);
  //   }
    // const componentWillUnmount() {
    //     document.removeEventListener('keydown', this.handleKeyPress);
    // }

   const handleImageClick = largeImageUrl => {
     setlargeImageUrl(largeImageUrl);
     setIsModalOpen(true);
   };

   const handleModalClickClose = event => {
     if (event.target.id === 'modal' && isModalOpen) {
    setIsModalOpen(false);
     }
   };

   const handleModalClose = () => {
    setIsModalOpen(false);
   };
   
// const handleKeyPress = event => {
//   if (event.key === 'Escape' && isModalOpen) {
//    setIsModalOpen(false);
//   }
// };

  //  const getImagesFromUrl = (searchUrl) => {
  //   axios.get(searchUrl).then(response => {
  //     const totalPages = Math.round(response.data.totalHits / 12);
  //     this.setState({ totalPages, images: response.data.hits });
  //   });
  //  }
   
 const  fetchMoreImages = () => {
    setPage(prevPage => prevPage + 1);
   };
   
  // const componentDidUpdate (prevProps, prevState) {
  //   if (
  //     prevState.query !== query ||
  //     prevState.page !== page
  //   ) {
  //     makeApiCall(query, page);
  //   }
  // };
   

    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleSearch} />
        <ImageGallery
          images={images}
          onModalOpen={handleImageClick}
        />
        {isModalOpen && (
          <Modal
            largeImageUrl={largeImageUrl}
            onClose={handleModalClose}
            onClickClose={handleModalClickClose}
            id={images.id}
          />
        )}
          {isLoading && (
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
        {totalPages > 1 &&
          page < totalPages && (
            <Button getMoreImage={fetchMoreImages} />
          )}
      </div>
    );
  }

export default App;
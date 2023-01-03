import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { GlobalStyle } from './GlobalStyle';
import { Box } from './Box';

import Searchbar from './Seachbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import PendingErrorMessage from './PendingErrorMessage';
import fetchPhotosAPI from '../services/photos-api';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [photos, setPhotos] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    //задати початковий стейт
    setPage(1);
    setTotalPage(0);
    setPhotos(null);
    setStatus('pending');
    setError(null);

    //запит до API з новим запитом
    fetchPhotosAPI(searchQuery, 1)
      .then(photos => {
        setPhotos(photos.hits);
        setStatus('resolved');
        setTotalPage(photos.totalHits);
      })
      //обробка звичайної помилки
      .catch(error => {
        setStatus('regected');
        setError(error);
      });
  }, [searchQuery]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    fetchPhotosAPI(searchQuery, page)
      .then(newPhotos => {
        //записати в стейт нові значення (відповід сервера + запис нового запита, зміна статусу)
        setPhotos([...photos, ...newPhotos.hits]);
        setStatus('resolved');
      })
      // обробка звичайної помилки
      .catch(error => {
        setStatus('regected');
        setError(error);
      });
  }, [page]);

  //заменить на просто подстановку setSearchQuery(searchQuery)
  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const onOpenModal = (url, tags) => {
    setLargeImageURL(url);
    setTags(tags);

    toggleModal();
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
      <Searchbar onSearch={handleFormSubmit} />

      {status === 'idle' && <div>Enter your photo query</div>}

      {status === 'resolved' && (
        <>
          <ImageGallery photos={photos} onOpenModal={onOpenModal} />
          {photos.length < totalPage && <Button onLoadMore={onLoadMore} />}
        </>
      )}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <PendingErrorMessage message={error.message} />}

      {showModal && (
        <Modal onClose={toggleModal} src={largeImageURL} alt={tags} />
      )}
      <GlobalStyle />
    </Box>
  );
};

App.propTypes = {
  photos: PropTypes.array,
  totalPages: PropTypes.number,
  searchQuery: PropTypes.string,
  showModal: PropTypes.bool,
  error: PropTypes.string,
  status: PropTypes.string,
  page: PropTypes.number,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};

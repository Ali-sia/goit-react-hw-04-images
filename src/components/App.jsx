import React, { Component } from 'react';
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

export class App extends Component {
  static propTypes = {
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

  state = {
    searchQuery: '',
    photos: null,
    page: 1,
    error: null,
    status: 'idle',
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    //попередній та поточний запити
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    //попередня та поточна сторінка
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const firstPage = 1;

    //якщо запит змінився
    if (nextQuery !== prevQuery) {
      //задати початковий стейт
      this.setState({
        page: firstPage,
        photos: null,
        status: 'pending',
        error: null,
      });
      //запит до API з новим запитом
      fetchPhotosAPI(nextQuery, firstPage)
        .then(photos => {
          // // обробка помилки (поки не працює)
          // this.setState({
          //   status: 'rejected',
          // });
          // if (photos.length === 0) {
          //   return Promise.reject(
          //     new Error(`Cant find anithing by your query ${nextQuery}`)
          //   );
          // }
          //записати в стейт нові значення (відповідь сервера, зміна статусу)
          this.setState({
            photos,
            status: 'resolved',
          });
        })
        //обробка звичайної помилки
        .catch(error =>
          this.setState({
            error,
            status: 'regected',
          })
        );
    }

    //якщо сторінка змінилась
    if (nextPage !== firstPage && nextPage !== prevPage) {
      fetchPhotosAPI(nextQuery, nextPage)
        .then(newPhotos => {
          //записати в стейт нові значення (відповід сервера + запис нового запита, зміна статусу)
          this.setState({
            photos: [...this.state.photos, ...newPhotos],
            status: 'resolved',
          });
        })
        //обробка звичайної помилки
        .catch(error =>
          this.setState({
            error,
            status: 'regected',
          })
        );
    }
  }

  //відкриття-закриття модалного вікна через стейт
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  //отримання запиту користувача з форми
  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  //відкриття модального вікна у елементах списку з передачею великоформатного зображення
  onOpenModal = (url, tags) => {
    this.setState({ largeImageURL: url, tags });

    this.toggleModal();
  };

  //
  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { showModal, photos, error, status, largeImageURL, tags } =
      this.state;

    return (
      <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
        <Searchbar onSearch={this.handleFormSubmit} />

        {status === 'idle' && <div>Enter your photo query</div>}

        {status === 'resolved' && (
          <>
            <ImageGallery photos={photos} onOpenModal={this.onOpenModal} />
            {photos.length === 12 && <Button onLoadMore={this.onLoadMore} />}
          </>
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && (
          <PendingErrorMessage message={error.message} />
        )}

        {showModal && (
          <Modal onClose={this.toggleModal} src={largeImageURL} alt={tags} />
        )}
        <GlobalStyle />
      </Box>
    );
  }
}

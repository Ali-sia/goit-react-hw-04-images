// import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from './ImageGalleryItem';

import { ImageList } from './ImageGallery.styled';

const ImageGallery = ({ photos, onOpenModal }) => {
  return (
    <ImageList>
      {photos.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onOpenModal={onOpenModal}
        />
      ))}
    </ImageList>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onOpenModal: PropTypes.func.isRequired,
};

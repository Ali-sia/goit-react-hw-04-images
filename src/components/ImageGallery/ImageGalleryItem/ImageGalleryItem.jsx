// import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({
  onOpenModal,
  webformatURL,
  tags,
  largeImageURL,
}) => {
  return (
    <GalleryItem onClick={() => onOpenModal(largeImageURL, tags)}>
      <GalleryImage src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};

export default ImageGalleryItem;

// ImageGalleryItem.propTypes = {};

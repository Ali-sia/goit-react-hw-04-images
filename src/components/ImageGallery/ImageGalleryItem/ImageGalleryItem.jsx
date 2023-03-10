import PropTypes from 'prop-types';
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

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,

  onOpenModal: PropTypes.func.isRequired,
};

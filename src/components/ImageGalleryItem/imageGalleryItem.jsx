import PropTypes from 'prop-types';
import {
  ImageGalleryItem,
  ImageGalleryItemImage,
} from './imageGalleryItem.styled';

function GalleryItem({ queryImages }) {
  return queryImages.map(({ id, webformatURL, largeImageURL }) => (
    <ImageGalleryItem key={id}>
      <ImageGalleryItemImage
        src={webformatURL}
        data-img-src={largeImageURL}
        alt=""
      />
    </ImageGalleryItem>
  ));
}

export default GalleryItem;

GalleryItem.propTypes = {
  queryImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
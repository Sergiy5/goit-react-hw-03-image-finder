import PropTypes from 'prop-types';
import { ImageGallery } from './imageGallery.styled';

const Gallery = ({ onClick, children }) => {
  return <ImageGallery onClick={onClick}>{children}</ImageGallery>;
};
export default Gallery;

Gallery.propTypes = {
  onClick: PropTypes.func.isRequired
}
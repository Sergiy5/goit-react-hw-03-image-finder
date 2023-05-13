import { Component } from 'react';
import { FetchAPI } from '../utils/serviceAPI';
import PropTypes from 'prop-types';
import Searchbar from './Searchbar/searchbar';
import Gallery from './ImageGallery/imageGallery';
import GalleryItem from './ImageGalleryItem/imageGalleryItem';
import Loader from './Loader/loader';
import LoadMoreBtn from './Button/button';
import ModalWindow from './Modal/modal';
export default class App extends Component {
  state = {
    images: [],
    query: null,
    page: 1,
    lastPage: 0,
    status: 'idle',
    showModal: false,
    currentImage: '',
  };
  serchQuery = data => {
    this.setState({ query: data });
  };
  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const { query, page, images } = this.state;
    const prevPage = prevState.page;

    if (prevQuery !== query) {
      this.setState({ status: 'pending' });

      FetchAPI(query)
        .then(images => {
          const lastPage = this.calculateLastPage(12, images.totalHits);
          if (images.hits.length) {
            this.setState({
              images: images.hits,
              status: lastPage === this.state.page ? 'idle' : 'resolved',
              lastPage: lastPage,
            });
          }
          if (images.hits.length === 0) {
            this.setState({ status: 'rejected' });
            alert(`За запитом ${query} нічого не знайдено`);
          }
        })
        .catch(error => {
          alert(error);
          this.setState({ status: 'rejected' });
        });
    }
    if (prevPage !== page) {
      this.setState({ status: 'pending' });
      FetchAPI(query, page)
        .then(newImages => {
          const { lastPage, page } = this.state;
          this.setState({
            images: [...images, ...newImages.hits],
            status: lastPage === page ? 'idle' : 'resolved',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  calculateLastPage = (itemsOnPage, totalItems) => {
    const lastPage = Math.ceil(Number(totalItems) / itemsOnPage);
    return lastPage;
  };
  handlePage = () => {
    this.setState({ page: this.state.page + 1 });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  handleModal = e => {
    const IMAGE = e.target.dataset.imgSrc;
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      currentImage: IMAGE,
    }));
  };
  render() {
    const { images, status, showModal, currentImage, error } = this.state;
    return (
      <div
        style={{
          height: '100vh',
          display: 'block',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.serchQuery}></Searchbar>
        {images.length > 0 && (
          <Gallery onClick={this.handleModal}>
            <GalleryItem queryImages={images} />
          </Gallery>
        )}
        {status === 'rejected' && <div>Oups {error}</div> }
        {status === 'pending' && (
          <ModalWindow>
            <Loader />
          </ModalWindow>
        )}
        {status === 'resolved' && (
          <LoadMoreBtn onClick={() => this.handlePage()}></LoadMoreBtn>
        )}
        {showModal && (
          <ModalWindow
            onClick={() => this.toggleModal()}
            onClose={this.toggleModal}
          >
            {' '}
            <img src={currentImage} alt="" />{' '}
          </ModalWindow>
        )}
      </div>
    );
  }
}

App.propTypes = {
  state: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.shape({})),
    query: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    showModal: PropTypes.bool.isRequired,
    currentImage: PropTypes.string.isRequired,
  }),
};

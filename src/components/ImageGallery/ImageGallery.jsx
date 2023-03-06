import { Component } from 'react';
import { toast } from 'react-hot-toast';
import { getImages } from 'settings/getImages';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from '../Button';
import { Loader } from 'components/Loader';
import { Modal } from './Modal';

import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    images: [],
    loader: false,
    error: '',
    page: 1,
    showModal: false,
    largeImage: '',
    totalHits: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { value, startingPage } = this.props;

    if (prevProps.value !== value) {
      this.setState({ loader: true });
      this.setState({ page: 1 });

      if (prevProps.value !== value) {
        this.setState({ images: [] });
      }

      getImages(value, startingPage)
        .then(res => res.json())
        .then(images => {
          if (images.hits.length === 0) {
            toast.error('No images was found for your request!');
            this.setState({ loader: false });

            return;
          }
          this.setState({ images: [...images.hits] });
          this.setState({
            loader: false,
            totalHits: images.totalHits,
          });
        })
        .catch(error => {
          this.setState({ error });
        });
    }
  }

  handleLoading = () => {
    const { page } = this.state;

    getImages(this.props.value, page + 1)
      .then(res => res.json())
      .then(images => {
        if (images.hits.length === 0) {
          toast.error('No images was found for your request!');
          return;
        }
        this.setState({ images: [...this.state.images, ...images.hits] });
        this.setState({
          page: page + 1,
        });
      });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  showModal = id => {
    const image = this.state.images.find(image => image.id === id);
    this.setState({
      largeImage: image.largeImageURL,
    });
  };

  render() {
    const { error, loader, images, showModal, largeImage, totalHits } =
      this.state;

    return (
      <div className={css.containerImage}>
        {error && <p>{error}</p>}
        {loader && <Loader />}

        <ul className={css.ImageGallery}>
          <>
            <ImageGalleryItem
              images={images}
              openModal={this.toggleModal}
              handlePreview={this.showModal}
            />
          </>
        </ul>
        {images.length < totalHits && <Button loadMore={this.handleLoading} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <div>
              <img src={largeImage} alt=""></img>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
};

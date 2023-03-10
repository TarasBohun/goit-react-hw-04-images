import { ImageGalleryItem } from './ImageGalleryItem';

import PropTypes from 'prop-types';

import { Modal } from '../Modal';

import css from './ImageGallery.module.css';
import { Component } from 'react';

export class ImageGallery extends Component {
  state = {
    showModal: false,
    largeImage: '',
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  showModal = id => {
    const image = this.props.images.find(image => image.id === id);
    this.setState({
      largeImage: image.largeImageURL,
    });
  };

  render() {
    const { showModal, largeImage } = this.state;
    return (
      <div className={css.containerImage}>
        <ul className={css.ImageGallery}>
          <>
            <ImageGalleryItem
              images={this.props.images}
              openModal={this.toggleModal}
              handlePreview={this.showModal}
            />
          </>
        </ul>
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

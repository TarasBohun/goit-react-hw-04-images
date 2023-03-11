import { ImageGalleryItem } from './ImageGalleryItem';

import PropTypes from 'prop-types';

import { Modal } from '../Modal';

import css from './ImageGallery.module.css';
import { useState } from 'react';

export const ImageGallery = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getShowModal = id => {
    const image = images.find(image => image.id === id);
    setLargeImage(image.largeImageURL);
  };

  return (
    <div className={css.containerImage}>
      <ul className={css.ImageGallery}>
        <>
          <ImageGalleryItem
            images={images}
            openModal={toggleModal}
            handlePreview={getShowModal}
          />
        </>
      </ul>
      {showModal && (
        <Modal onClose={toggleModal}>
          <div>
            <img src={largeImage} alt=""></img>
          </div>
        </Modal>
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      // id: PropTypes.number.isRequired,
      // webformatURL: PropTypes.string.isRequired,
      // user: PropTypes.string,
    })
  ),
};

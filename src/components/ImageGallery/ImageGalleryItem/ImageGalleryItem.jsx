import PropTypes from 'prop-types';
// import { Component } from 'react';

import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images, openModal, handlePreview }) => {
  return images.map(image => {
    return (
      <li
        key={image.id}
        className={css.ImageGalleryItem}
        onClick={() => {
          openModal();
        }}
      >
        <img
          className={css.ImageGalleryItemImage}
          src={image.webformatURL}
          alt={image.user}
          width={150}
          onClick={() => {
            handlePreview(image.id);
          }}
        />
      </li>
    );
  });
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      user: PropTypes.string,
    })
  ),
  openModal: PropTypes.func.isRequired,
  handlePreview: PropTypes.func.isRequired,
};

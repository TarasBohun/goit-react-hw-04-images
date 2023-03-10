import PropTypes from 'prop-types';
import { Component } from 'react';

import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  render() {
    return this.props.images.map(image => {
      return (
        <li
          key={image.id}
          className={css.ImageGalleryItem}
          onClick={() => {
            this.props.openModal();
          }}
        >
          <img
            className={css.ImageGalleryItemImage}
            src={image.webformatURL}
            alt={image.user}
            width={150}
            onClick={() => {
              this.props.handlePreview(image.id);
            }}
          />
        </li>
      );
    });
  }
}

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

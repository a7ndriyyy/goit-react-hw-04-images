import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

 class ImageGalleryItem extends Component {
  render() {
    return (
      <li className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItemImage}
          src={this.props.image.webformatURL}
          alt={this.props.image.tags}
          data-largeimg={this.props.image.largeImageURL}
          onClick={event => {
            this.props.onImgClick(event.target.dataset.largeimg);
          }}
        />
      </li>
    );
  }
}
export default ImageGalleryItem;
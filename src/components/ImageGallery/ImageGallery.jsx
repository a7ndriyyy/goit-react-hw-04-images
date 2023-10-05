import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
 class ImageGallery extends Component {
  render() {
    return (
      <ul className={css.ImageGallery}>
        {this.props.images.map(image => (
          <ImageGalleryItem
            key={image.id}
            onImgClick={this.props.onModalOpen}
            image={image}
          />
        ))}
      </ul>
    );
  }
}
export default ImageGallery;
import { galleryItems } from './gallery-items';

console.log(galleryItems);

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRef = document.querySelector('.gallery');

const createGalleryMarkup = galleryItems
  .map(
    ({
      preview,
      original,
      description,
    }) => `<a class="gallery__item" href=${original} >
  <img class="gallery__image" src=${preview} alt=${description} title=${description}/>
</a>`
  )
  .join('');

galleryRef.insertAdjacentHTML('afterbegin', createGalleryMarkup);

new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

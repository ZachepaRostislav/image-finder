import React from 'react';
import { ItemImg, ListItem } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ id, previewImg, tags }) {
  return (
    <>
      <ListItem className="gallery-item" key={id}>
        <ItemImg src={previewImg} alt={tags} />
      </ListItem>
    </>
  );
}

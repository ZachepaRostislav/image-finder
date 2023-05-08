import React from 'react';
import { Overlay, Window, ModalImg } from './Modal.styled';

export default function Modal() {
  return (
    <>
      <Overlay className="overlay">
        <Window className="modal">
          <ModalImg src="" alt="" />
        </Window>
      </Overlay>
    </>
  );
}

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, ModalContainer } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ src, alt, onClose }) => {
  useEffect(() => {
    //componenDidMount
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      //componentDidUnmount
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalContainer>
        <img src={src} alt={alt} loading="lazy" />
      </ModalContainer>
    </Overlay>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func,
};

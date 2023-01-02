import React, { Component } from 'react';
import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';
// #TODO

import { Overlay, ModalContainer } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  // static propTypes = {
  //   // contacts: PropTypes.arrayOf(
  //   //   PropTypes.shape({
  //   //     id: PropTypes.string.isRequired,
  //   //     name: PropTypes.string.isRequired,
  //   //     number: PropTypes.string.isRequired,
  //   //   })
  //   // ),
  //   // filter: PropTypes.string,
  // };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props;
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalContainer>
          <img src={src} alt={alt} loading="lazy" />
        </ModalContainer>
      </Overlay>,
      modalRoot
    );
  }
}

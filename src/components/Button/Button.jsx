import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.styled';

const Button = ({ onLoadMore }) => {
  return (
    <ButtonLoadMore id="onLoadMore" type="button" onClick={onLoadMore}>
      Load more
    </ButtonLoadMore>
  );
};

export default Button;

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

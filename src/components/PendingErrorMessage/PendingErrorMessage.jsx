import PropTypes from 'prop-types';

const PendingErrorMessage = ({ message }) => {
  return <p>{message}</p>;
};

export default PendingErrorMessage;

PendingErrorMessage.propTypes = {
  message: PropTypes.string,
};

import React from 'react';
import PropTypes from 'prop-types';

function Copy({ copy }) {
  return <section dangerouslySetInnerHTML={{ __html: copy }} />;
}

Copy.propTypes = {
  copy: PropTypes.string.isRequired,
};

export default Copy;

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

function Image({ caption, description, image }) {
  return (
    <section>
      <figure>
        <Img sizes={image.sizes} alt={description ? description : ''} />
        {caption && (
          <figcaption>
            <p>{caption}</p>
          </figcaption>
        )}
      </figure>
    </section>
  );
}

Image.propTypes = {
  url: PropTypes.string.isRequired,
  caption: PropTypes.string,
  description: PropTypes.string,
};

export default Image;

import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

function Footer({ colophon, socialLinks }) {
  return (
    <footer>
      <h3>Social links</h3>
      {socialLinks && (
        <ul>
          {socialLinks.map((item) => (
            <li key={item.id}>
              <a href={item.url} title={item.title}>
                <SVG src={item.icon.file.url} />
              </a>
            </li>
          ))}
        </ul>
      )}
      <cite>
        © {new Date().getFullYear()} {colophon && colophon}
      </cite>
    </footer>
  );
}

Footer.propTypes = {
  colophon: PropTypes.string,
  socialLinks: PropTypes.array,
};

export default Footer;

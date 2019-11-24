import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

function Header({ mainNavigation, siteTitle }) {
  return (
    <header>
      <nav>
        <Link to="/">{siteTitle}</Link>

        {/* Main Navigation */}
        {mainNavigation && (
          <ul>
            {mainNavigation.map((item) => (
              <li key={item.id}>
                <Link to={item.slug}>{item.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  mainNavigation: PropTypes.array.isRequired,
};

export default Header;

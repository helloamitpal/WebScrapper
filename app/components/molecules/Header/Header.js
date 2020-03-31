import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import LocaleSelector from '../../atoms/LocaleSelector';
import translate from '../../../locale';
import config from '../../../config';

import './header.scss';

const Header = ({ onChangeLocale }) => {
  const [menuOpen, setMenuToggle] = useState(false);

  const toggleMenu = () => setMenuToggle(!menuOpen);
  const menuOpenOverlayStyle = { display: 'block', opacity: 1 };
  const menuOpenStyle = { transform: 'translateX(0px)' };

  return (
    <div className="header-container navbar-fixed">
      <nav className="red">
        <div className="container">
          <div className="nav-wrapper">
            <a href={config.SCRAPPER_PAGE} className="brand-logo">
              {translate('common.appName')}
            </a>
            <LocaleSelector className="right" onChangeLocale={onChangeLocale} />
            <span onClick={toggleMenu} className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </span>
            <div
              className="sidenav-overlay"
              style={menuOpen ? menuOpenOverlayStyle : null}
              onClick={toggleMenu}
            />
            <ul
              id="slide-out"
              className="sidenav"
              style={menuOpen ? menuOpenStyle : null}
            >
              <li>
                <a className="subheader">{translate('common.menu')}</a>
              </li>
              <li>
                <div className="divider" />
              </li>
              <li>
                <Link to={config.SCRAPPER_PAGE} className="item" onClick={toggleMenu}>
                  {translate('common.home')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

Header.propTypes = {
  onChangeLocale: PropTypes.func
};

Header.defaultProps = {
  onChangeLocale: null
};

export default Header;

import React from 'react';
import { NavLink } from 'react-router-dom';
import fbIcon from '../../images/facebook.svg';
import ghIcon from '../../images/github.svg';

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <p className="footer__copyright">&copy; 2020 Supersite, Powered by News API</p>
      <nav className="footer__navigation">
        <ul className="footer__nav-list">
          <li className="footer__nav-item">
            <NavLink className="footer__link footer__link_main" to="/">Главная</NavLink>
            <a className="footer__link footer__link_praktikum" target="_blank" rel="noopener noreferrer" href="https://praktikum.yandex.ru/">Яндекс.Практикум</a>
          </li>
          <li className="footer__nav-item">
            <a className="footer__link footer__link_github" target="_blank" href="https://github.com/shum89" rel="noopener noreferrer"><img src={ghIcon} alt="github icon" /></a>
            <a
              className="footer__link footer__link_facebook"
              target="_blank"
              href="https://facebook.com/filipp.shumakov89
"
              rel="noopener noreferrer"
            >
              <img src={fbIcon} alt="facebook logo" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;

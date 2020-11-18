import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import headerButtonIconDark from '../../images/logout_dark.svg';
import headerButtonIconLight from '../../images/logout_light.svg';
import Burger from '../Burger/Burger';

const Header = ({
  isMobileMenuOpen, setMobileMenu, isLoggedIn, onLogout, onAuth,
}) => {
  const location = useLocation();
  const currentUser = React.useContext(CurrentUserContext);
  const headerClassLocation = location.pathname === '/' ? '' : 'header_bg_light';
  const headerLogoFont = (location.pathname === '/saved-news' && !isMobileMenuOpen) ? 'header__logo_font_black' : '';
  const headerLinkFont = (location.pathname === '/saved-news' && !isMobileMenuOpen) ? 'header__navigation-link_font_black' : '';
  const headerMainActive = (location.pathname === '/' && isMobileMenuOpen) ? 'header__navigation-link_active_white' : '';
  const headerSavedNewsActive = (location.pathname === '/saved-news' && !isMobileMenuOpen) ? 'header__navigation-link_active_black' : '';
  const headerClassMobile = isMobileMenuOpen ? 'header_bg_dark' : '';
  const headerNavigationClass = isMobileMenuOpen ? 'header__navigation_opened' : '';
  const headerButtonDark = (location.pathname === '/saved-news' && !isMobileMenuOpen) ? 'header__button_theme_black' : 'header__button_theme_white';
  const headerMobileOverlay = isMobileMenuOpen ? 'header__mobile-overlay_visible' : '';

  return (
    <header aria-label="header" className={`header ${headerClassMobile} ${headerClassLocation}`}>
      <div className="header__container">
        <NavLink className={`header__logo ${headerLogoFont}`} to="/">NewsExplorer</NavLink>
        <nav aria-label="navigation menu" className={`header__navigation ${headerNavigationClass}`}>
          <ul className="header__navigation-wrapper">
            <li className="header__navigation-item">
              <NavLink className={`header__navigation-link ${headerLinkFont} ${headerMainActive} ${headerMainActive}`} to="/">Главная</NavLink>
            </li>
            {isLoggedIn && (
            <li className="header__navigation-item">
              <NavLink className={`header__navigation-link ${headerLinkFont} ${headerSavedNewsActive}`} to="/saved-news">Сохраненные статьи</NavLink>
            </li>
            )}
            <li className="header__navigation-item">
              {isLoggedIn ? (
                <button className={`header__button ${headerButtonDark}`} type="button" aria-label="button for logout" onClick={onLogout}>
                  <p className="header__button-name">{currentUser.name}</p>
                  <img className="header__button-icon" alt="header logout icon" src={(location.pathname === '/' || isMobileMenuOpen) ? headerButtonIconLight : headerButtonIconDark} />
                </button>
              ) : (
                <button onClick={onAuth} className={`header__button header__button_auth ${headerButtonDark}`} type="button" aria-label="button for auth">
                  <p className="header__button-name">Авторизоваться</p>
                </button>
              ) }
            </li>
          </ul>
        </nav>
        <Burger isMobileMenuOpened={isMobileMenuOpen} onMobileMenu={setMobileMenu} />
      </div>
      <div className={`header__mobile-overlay ${headerMobileOverlay}`} />
    </header>
  );
};

export default Header;

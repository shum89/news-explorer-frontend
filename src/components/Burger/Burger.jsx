import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * burger for mobile menu
 * @param onMobileMenu {function} handles click on mobile menu
 * @param isMobileMenuOpened {boolean} checks if mobile menu is open
 * @return {JSX.Element}
 * @constructor
 */
function Burger({ onMobileMenu, isMobileMenuOpened }) {
  const location = useLocation();
  const burgerDashBlack = location.pathname === '/' ? '' : 'burger__dash_black';
  return (
    <button className="burger" type="button" onClick={onMobileMenu}>
      <span className={`burger__dash ${burgerDashBlack} ${isMobileMenuOpened ? 'burger__dash_active' : null}`} />
    </button>
  );
}

export default Burger;

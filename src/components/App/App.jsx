import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import AuthPopup from '../AuthPopup/AuthPopup';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import LoginPopup from '../LoginPopup/LoginPopup';
import TootipPopup from '../Tooltip/Tooltip';
import Main from '../Main/Main';
import '../../index.css';
import SavedNews from '../SavedNews/SavedNews';

const { useState, useCallback } = React;

const App = () => {
  const [isMobileMenuOpen, setMobileMenu] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [isSaved, setSaved] = useState(false);
  const [isAuthPopupOpen, setAuthPopup] = useState(false);
  const [isLoginPopupOpen, setLoginPopup] = useState(false);
  const [isTooltipOpen, setTootltip] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const popupStates = [isAuthPopupOpen, isLoginPopupOpen, isTooltipOpen];
  const handleEsc = useCallback((e) => {
    if (e.key === 'Escape') {
      handleClosePopup();
    }
  }, []);

  React.useEffect(() => {
    if (popupStates.some((el) => el === true)) {
      window.addEventListener('keyup', handleEsc);
    } else {
      window.removeEventListener('keyup', handleEsc);
    }
  }, [handleEsc, popupStates]);

  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenuOpen);
  };

  const handleSaveIcon = () => {
    setSaved(!isSaved);
  };

  const handleClosePopup = () => {
    setAuthPopup(false);
    setLoginPopup(false);
    setTootltip(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const changeToLoginPopup = () => {
    handleClosePopup();
    setLoginPopup(true);
  };

  const changeToAuthPopup = () => {
    handleClosePopup();
    setAuthPopup(true);
  };

  const handleToolipPopup = () => {
    handleClosePopup();
    setTootltip(true);
  };

  const openAuthPopup = () => {
    setAuthPopup(true);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="app">
      <Header onAuth={openAuthPopup} onLogout={handleLogout} isLoggedIn={isLoggedIn} isMobileMenuOpen={isMobileMenuOpen} setMobileMenu={handleMobileMenu} />
      <Switch>
        <Route exact path="/">
          <Main isLoading={isLoading} isLoggedIn={isLoggedIn} isSaved={isSaved} onSaveIcon={handleSaveIcon} />
        </Route>
        <Route path="/saved-news">
          <SavedNews />
        </Route>
      </Switch>
      <Footer />
      <AuthPopup isOpen={isAuthPopupOpen} onClose={handleClosePopup} handleChangePopup={changeToLoginPopup} onAuth={handleToolipPopup} name="register" />
      <LoginPopup isOpen={isLoginPopupOpen} onLogin={handleLogin} onClose={handleClosePopup} handleChangePopup={changeToAuthPopup} name="login" />
      <TootipPopup isOpen={isTooltipOpen} onClose={handleClosePopup} handleChangePopup={changeToLoginPopup} />
    </div>
  );
};

export default withRouter(App);

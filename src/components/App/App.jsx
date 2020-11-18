import React from 'react';
import {
  Route, Switch, withRouter, useHistory,
} from 'react-router-dom';
import AuthPopup from '../AuthPopup/AuthPopup';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import LoginPopup from '../LoginPopup/LoginPopup';
import TootipPopup from '../Tooltip/Tooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import '../../index.css';
import SavedNews from '../SavedNews/SavedNews';
import { requestNews } from '../../utils/NewsApi';
import {
  authorize, registerUser, getUserInfo, saveArticle, deleteArticle, getSavedNews,
} from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SavedNewsContext from '../../contexts/SavedNewsContext';
import { ERROR_SAVED_NEWS, ERROR_SEARCH, ERRPR_DELETE_CARD } from '../../utils/constants';

const { useState, useCallback, useEffect } = React;

const App = () => {
  /**
   * mobile menu state
   */
  const [isMobileMenuOpen, setMobileMenu] = useState(false);
  /**
   *logged in state
   */
  const [isLoggedIn, setLoggedIn] = useState(false);
  /**
   * popup states
   */
  const [isAuthPopupOpen, setAuthPopup] = useState(false);
  const [isLoginPopupOpen, setLoginPopup] = useState(false);
  const [isTooltipOpen, setTootltip] = useState(false);
  /**
   * preloader state
   */
  const [isLoading, setLoading] = useState(false);
  /**
   * news state
   */
  const [news, setNews] = useState([]);
  /** search status
   *
   */
  const [searchStatus, setSearchStatus] = useState(false);
  /**
   * rows for show more
   */
  const [row, setRow] = useState(0);
  /**
   * popup error state
   */
  const [popupError, setPopupError] = useState('');
  /**
   * current user state
   */
  const [currentUser, setUser] = useState({
    name: '',
    email: '',
  });
  /**
   * saved news state
   */
  const [savedNews, setSavedNews] = useState([]);
  const history = useHistory();
  /**
   * error message state
   */
  const [errorMessage, setErrorMessage] = useState('');
  /**
   * search input error
   */
  const [searchError, setSearchError] = useState(false);

  const popupStates = [isAuthPopupOpen, isLoginPopupOpen, isTooltipOpen];
  /**
   * handles escape event
   * @type {function(*): void}
   */
  const handleEsc = useCallback((e) => {
    if (e.key === 'Escape') {
      handleClosePopup();
    }
  }, []);

  /**
   * get news from localStorage
   */
  useEffect(() => {
    const localStorageNews = JSON.parse(localStorage.getItem('news'));
    if (localStorageNews && localStorageNews.length) {
      setNews(localStorageNews);
      setSearchStatus(true);
    }
  }, []);

  /**
   * get savedNews
   */
  function handleGetSavedNews() {
    getSavedNews()
      .then((data) => setSavedNews(data.articles))
      .catch((err) => console.log(`${ERROR_SAVED_NEWS} ${err.message}`));
  }

  /**
   * login if jwt token in localStorage
   */
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getUserInfo(jwt)
        .then((res) => {
          if (res.name) {
            setLoggedIn(true);
            setUser(res);
            handleGetSavedNews();
          } else {
            console.log(res.message);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  /**
   * requestNews
   * @param keyword
   */
  const handleGetNews = (keyword) => {
    if (!keyword) {
      setErrorMessage(ERROR_SEARCH);
      return;
    }
    setErrorMessage('');
    setLoading(true);
    setSearchStatus(false);
    setRow(0);
    setSearchError(false);
    requestNews(keyword).then((res) => {
      const articles = res.articles.map((article) => ({ ...article, keyword }));
      setNews(articles);
      localStorage.setItem('news', JSON.stringify(articles));
      setSearchStatus(true);
    }).catch((err) => {
      console.log(err);
      setSearchError(true);
    }).finally(() => {
      setLoading(false);
      setSearchStatus(true);
    });
  };

  /**
   * handle register
   * @param name
   * @param password
   * @param email
   */
  const handleRegister = (name, password, email) => {
    registerUser(name, email, password).then(() => {
      setTootltip(true);
    }).catch((err) => {
      setPopupError(err.message);
    });
  };

  /**
   * handle delete article
   * @param saved
   */
  const handleDeleteArticle = (saved) => {
    deleteArticle(saved._id)
      .then(() => setSavedNews(savedNews.filter((item) => item._id !== saved._id)))
      .catch((err) => console.log(`${ERRPR_DELETE_CARD} ${err}`));
  };

  /**
   * escape event listener add
   */
  React.useEffect(() => {
    if (popupStates.some((el) => el === true)) {
      window.addEventListener('keyup', handleEsc);
    } else {
      window.removeEventListener('keyup', handleEsc);
    }
  }, [handleEsc, popupStates]);

  /**
   * open mobile menu
   */
  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenuOpen);
  };

  /**
   * handle save news
   * @param article
   */
  const handleSaveNews = (article) => {
    if (!isLoggedIn) return setLoginPopup(true);
    const saved = savedNews.find((savedArticle) => savedArticle.date === article.publishedAt && savedArticle.title === article.title);
    if (!saved) {
      saveArticle(article).then((data) => setSavedNews([...savedNews, data])).catch((err) => console.log(err));
      return;
    }
    handleDeleteArticle(saved);
  };

  /**
   * handle Close Popup
   */
  const handleClosePopup = () => {
    setAuthPopup(false);
    setLoginPopup(false);
    setTootltip(false);
    setPopupError('');
  };

  /**
   * handle logout
   */
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setUser({
      name: '',
      email: '',
    });
    history.push('/');
  };

  /**
   * change To Login Popup
   */
  const changeToLoginPopup = () => {
    handleClosePopup();
    setLoginPopup(true);
  };

  /**
   * change to auth popup
   */
  const changeToAuthPopup = () => {
    handleClosePopup();
    setAuthPopup(true);
  };

  /**
   * handle login
   * @param email
   * @param password
   */
  const handleLogin = (email, password) => {
    authorize(email, password).then((data) => {
      if (data.token) {
        handleClosePopup();
        localStorage.setItem('jwt', data.token);
        getUserInfo(data.token).then((userInfo) => {
          if (userInfo.name) {
            setLoggedIn(true);
            setUser(userInfo);
          } else {
            console.log(userInfo.message);
          }
        });
      } else {
        setPopupError(data.message);
      }
    });
  };

  /**
   * show more handler
   */
  const handleShowMore = () => {
    setRow(row + 1);
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SavedNewsContext.Provider value={savedNews}>
        <div className="app">
          <Header
            onAuth={changeToLoginPopup}
            onLogout={handleLogout}
            isLoggedIn={isLoggedIn}
            isMobileMenuOpen={isMobileMenuOpen}
            setMobileMenu={handleMobileMenu}
          />
          <Switch>
            <Route exact path="/">
              <Main
                onShowMore={handleShowMore}
                row={row}
                searchStatus={searchStatus}
                onSearch={handleGetNews}
                news={news}
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
                onSaveIcon={handleSaveNews}
                errorMessage={errorMessage}
                searchError={searchError}
              />
            </Route>
            <ProtectedRoute
              path="/saved-news"
              component={SavedNews}
              isLoggedIn={isLoggedIn}
              onDeleteButton={handleDeleteArticle}
              setLoginPopup={changeToLoginPopup}
            />
          </Switch>
          <Footer />
          <AuthPopup isOpen={isAuthPopupOpen} onClose={handleClosePopup} handleChangePopup={changeToLoginPopup} onAuth={handleRegister} popupError={popupError} formName="register" />
          <LoginPopup isOpen={isLoginPopupOpen} popupError={popupError} onLogin={handleLogin} onClose={handleClosePopup} handleChangePopup={changeToAuthPopup} name="login" />
          <TootipPopup isOpen={isTooltipOpen} onClose={handleClosePopup} handleChangePopup={changeToLoginPopup} />
        </div>
      </SavedNewsContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default withRouter(App);

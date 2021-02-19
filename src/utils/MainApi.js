import { BASE_URL } from './constants';

export const registerUser = (name, email, password) => fetch(`${BASE_URL}signup`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({ email, password, name }),
}).then((res) => {
  if (!res.ok) {
    return res.json().then((err) => {
      if (err.error) {
        throw new Error(err.error);
      } else {
        throw new Error(err.message);
      }
    });
  }
  return res.json();
});

export const authorize = (email, password) => fetch(`${BASE_URL}signin`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({ email, password }),
})
  .then((res) => res.json()).catch((err) => {
    console.log(err);
  });

export const getUserInfo = (token) => fetch(`${BASE_URL}users/me`, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  credentials: 'include',
})
  .then((res) => res.json()).catch((err) => {
    console.log(err);
  });

export const getSavedNews = () => fetch(`${BASE_URL}articles`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
  credentials: 'include',
})
  .then((res) => res.json());

export const saveArticle = (article) => {
  const {
    keyword, title, description, publishedAt, source, url, urlToImage,
  } = article;
  return fetch(`${BASE_URL}articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    credentials: 'include',
    body: JSON.stringify({
      keyword,
      title,
      text: description,
      date: publishedAt,
      source: source.name,
      link: url,
      image: urlToImage,
    }),
  })
    .then((res) => res.json());
};

export const deleteArticle = (id) => fetch(`${BASE_URL}articles/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
  credentials: 'include',
});

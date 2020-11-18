export const dateFrom = new Intl.DateTimeFormat('fr-ca',
  { year: 'numeric', month: '2-digit', day: '2-digit' }).format(Date.now());
export const dateTo = new Intl.DateTimeFormat('fr-ca',
  { year: 'numeric', month: '2-digit', day: '2-digit' }).format(Date.now() - 7 * 24 * 60 * 60 * 1000);
export const baseUrl = 'https://nomoreparties.co/news/v2/everything';
export const apiKey = '48b2b669ce4e45c59cf83c7fbd5c316e';
export const BASE_URL = 'https://api.s.news.students.nomoreparties.xyz/';
export const ERROR_SEARCH = 'Нужно ввести ключевое слово';
export const ERROR_SAVED_NEWS = 'Ошибка при загрузке сохранённых новостей:';
export const ERRPR_DELETE_CARD = 'Ошибка при удалении карточки:';

import {
  dateFrom, dateTo, baseUrl, apiKey,
} from './constants';

export const requestNews = async (request) => {
  try {
    const response = await fetch(`${baseUrl}?q=${request}&from=${dateFrom}&to=${dateTo}&pageSize=100&apiKey=${apiKey}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const news = await response.json();
    return news;
  } catch (err) {
    console.log(err);
  }
};

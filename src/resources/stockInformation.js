import { iex } from '../config/iex.js';

export const stockInformation = {
  latestPrice: (ticker, callback) => {
    const url = `${iex.base_url}/${ticker}?token=${iex.api_token}`;

    fetch(url).then((response) => response.json()).then((data) => {
      callback(data);
    })
  }
}

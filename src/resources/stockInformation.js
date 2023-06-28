import { iex } from '../config/iex.js';

export const stockInformation = {
  latestPrice: (ticker, callback) => {
    const url = `${iex.base_url}/${ticker}?token=${iex.api_token}`;

    try {
      fetch(url).then((response) => response.json()).then((data) => {
        callback(data);
      })
    }
    catch(err) {
      console.log('Hey, you prolly mispelled (but hey ya know if it is not mispelled then good luck soldier)')
      throw new Error(err);
    }
  }
}

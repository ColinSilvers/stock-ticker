import React from "react";
import { render } from 'react-dom'

import Stock from './components/Stock.js'

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <table className="table et-5">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Price</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <Stock ticker="AAPL"/>
            <Stock ticker="GOOG"/>
            <Stock ticker="MSFT"/>
            <Stock ticker="TSLA"/>
          </tbody>
        </table>
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'));
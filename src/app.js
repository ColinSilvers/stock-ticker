import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom'
import Chart from './components/Chart';
import Stock from './components/Stock.js'
import Table from 'react-bootstrap/Table'

const App = () => {

  const [ticker, setTicker] = useState('');
  const [name, setName] = useState('');
  const [chartTicker, setChartTicker] = useState('');


  const tickerArray = ['AAPL', 'GOOG', 'MSFT', 'TSLA', 'NVDA', 'JNJ', 'META', 'AMZN', 'BRK.B', 'UNH'];
  const tickerName = ['Apple', 'Google', 'Microsoft', 'Tesla', 'Nvidia', 'Johnson & Johnson', 'Facebook', 'Amazon', 'Berkshire Hathaway', 'UnitedHealth Group'];

  // const stocksObj = [{'AAPL':'Apple'}, {'GOOG':'Google'}, {'MSFT':'Microsoft'}, {'TSLA':'Tesla'}, {'NVDA':'Nvidia'},
  //                   {'JNJ':'Johnson & Johnson'}, {'META':'Facebook'}, {'AMZN':'Amazon'}, {'BRK.B':'Berkshire Hathaway'},
  //                 {'UNH': 'UnitedHealth Group'}]

  let stocksToRender = [];
  
  for(let i = 0; i < tickerArray.length; i++) {
    stocksToRender.push(<Stock ticker={tickerArray[i]} name={tickerName[i]}/>)
  }
  
  const [stocks, setStocks] = useState([stocksToRender]);

  const navigate = useNavigate();
  
  const navigateToChart = () => {
    navigate('/chart');
  }

  const navigateHome = () => {
    navigate('/');
    setChartTicker('');
  }

  const handleTickerChange = (event) => {
    setTicker(event.target.value);
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleChartTickerChange = (event) => {
    setChartTicker(event.target.value);
  }
  

  const handleClickAddStock = () => {
    const newStocks = [...stocks];
    newStocks.push(<Stock ticker={ticker} name={name}/>)
    setStocks(newStocks);
    setTicker('')
    setName('')
  }
  

  return (
    <div className="App">
      <div className="container">
        <Table stripped boredered hover variant='dark' size="sm" className="table et-5">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Name</th>
              <th>Price</th>
              <th>Volume</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {stocks}
          </tbody>
        </Table>
        <input 
          type="text"
          placeholder="ticker"
          id="chartTicker"
          name="chartTicker"
          onChange={handleChartTickerChange}
          value={chartTicker}
        />
        <button onClick={navigateToChart}>View Chart</button>
        <button onClick={navigateHome}>Close Chart</button>

        <Routes>
          <Route path='/chart' element={<Chart chartTicker={chartTicker}/>} />
          <Route path='/' />
        </Routes>
        <p>     
          <input
            type="text"
            placeholder="ticker"
            id="ticker"
            name="ticker"
            onChange={handleTickerChange}
            value={ticker}
          />
          <input
            type="text"
            placeholder="name"
            id="name"
            name="name"
            onChange={handleNameChange}
            value={name}
          />
        <button onClick={handleClickAddStock}>Add Stock</button>
        </p>
      </div>
    </div>
  )
};

export default App;
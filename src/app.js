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
  

  const handleClickAddStock = (event) => {
    event.preventDefault();
    const newStocks = [...stocks];
    if({ticker} === null || {name} === null) {
      console.log('Invalid ticker/name');
    }
    newStocks.push(<Stock ticker={ticker} name={name}/>)
    setStocks(newStocks);
    setTicker('')
    setName('')
  }

  const handleClickDeleteStock = (event) => {
    event.preventDefault();
    const newStocks = [...stocks];
    const arr = newStocks[0];
    const newArr = [];
    for(let i = 0; i < arr.length; i++) {
      if(!(arr[i].props.ticker === ticker || arr[i].props.name === name)) {
        newArr.push(arr[i]);
      }
    }
    newStocks[0] = newArr;
    setStocks(newStocks);
    setTicker('');
  }
  

  return (
    <div className="App">
      <div className="container">
        <Table className="table-success table-striped table-hover table-bordered" size="lg">
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
          autoComplete="off"
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
            autoComplete="off"
            id="ticker"
            name="ticker"
            onChange={handleTickerChange}
            value={ticker}
          />
          <input
            type="text"
            placeholder="name"
            autoComplete="off"
            id="name"
            name="name"
            onChange={handleNameChange}
            value={name}
          />
        <button onClick={handleClickAddStock}>Add Stock</button>
        <button onClick={handleClickDeleteStock}>Delete Stock</button>
        </p>
      </div>
    </div>
  )
};

export default App;
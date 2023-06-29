import React, {Component} from "react";
import Plot from 'react-plotly.js';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
      close: [],
      high: [],
      low: [],
      open: []
    }
  }

  componentDidMount() {
    this.fetchStock(this.props.chartTicker);
    console.log(this.props);
  }

  fetchStock(symbol) {
    const API_KEY = 'XRQL32GJIMR0FEM6';
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=compact&apikey=${API_KEY}`;
    const stockChartXValuesFunction = [];
    const stockChartYValuesFunction = [];
    const closeFunction = [];
    const highFuncion = [];
    const lowFunction = [];
    const openFunction = [];

    fetch(API_CALL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for(let key in data['Time Series (5min)']) {
        stockChartXValuesFunction.push(key);
        openFunction.push(data['Time Series (5min)'][key]['1. open']);
        closeFunction.push(data['Time Series (5min)'][key]['4. close']);
        highFuncion.push(data['Time Series (5min)'][key]['2. high']);
        lowFunction.push(data['Time Series (5min)'][key]['3. low']);

      }
      this.setState({
        stockChartXValues: stockChartXValuesFunction,
        stockChartYValues: stockChartYValuesFunction,
        close: closeFunction,
        high: highFuncion,
        low: lowFunction,
        open: openFunction
      });
    })
  }

  render() {
    return (
      <div className="chartContainer">
         <Plot
        data={[
          {
           x: this.state.stockChartXValues,
           close: this.state.close,
           decreasing: {line: {color: '#7F7F7F'}}, 
           high: this.state.high,
           increasing: {line: {color: '#17BECF'}}, 
           line: {color: 'rgba(31,119,180,1)'}, 
           low: this.state.low,
           open: this.state.open,
           type: 'candlestick',
           xaxis: 'x',
           yaxis: 'y'
            // marker: {color: 'green'},
          },
        ]}
        layout={
          {width: 1350, height: 500, title: 'Intraday Stock Price',
          plot_bgcolor: 'black'
        }
      }
      />
      </div>
    )
  }
}

export default Chart;
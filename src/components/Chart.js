import React, {Component} from "react";
import Plot from 'react-plotly.js';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
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

    fetch(API_CALL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for(let key in data['Time Series (5min)']) {
        stockChartXValuesFunction.push(key);
        stockChartYValuesFunction.push(data['Time Series (5min)'][key]['1. open']);
      }
      this.setState({
        stockChartXValues: stockChartXValuesFunction,
        stockChartYValues: stockChartYValuesFunction
      });
    })
  }

  render() {
    return (
      <div>
         <Plot
        data={[
          {
            x: this.state.stockChartXValues,
            y: this.state.stockChartYValues,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
        ]}
        layout={{width: 1350, height: 500, title: 'Intraday Stock Price Every 5 Minutes'}}
      />
      </div>
    )
  }
}

export default Chart;
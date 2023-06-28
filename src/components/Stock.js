import React, { Component } from 'react';
import { stockInformation } from '../resources/stockInformation.js'; 
import Chart from '../components/Chart.js'


class Stock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  applyData(data) {
    this.setState({
      data: data[data.length - 2]
    })
  }

  componentDidMount() {
    stockInformation.latestPrice(this.props.ticker, this.applyData.bind(this));
  }

    
  render() {
    return(
      <tr>
        <td>{this.props.ticker}</td>
        <td>{this.props.name}</td>
        <td>{this.state.data.close}</td>
        <td>{this.state.data.volume}</td>
        <td>{this.state.data.date}</td>
        <td>{this.state.data.label}</td>
      </tr>
    )
  };
}

export default Stock;
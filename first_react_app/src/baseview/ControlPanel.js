import React, { Component } from 'react'
import Counter from './Counter.js';

class ControlPanel extends Component {
  constructor(props) {
    super(props)
    this.onCounterUpdate = this.onCounterUpdate.bind(this)
    this.initValues = [0, 10, 20]
    const initSum = this.initValues.reduce((a, b) => a+b, 0)
    this.state = {
      sum: initSum
    }
  }

  onCounterUpdate(newValue, previousValue) {
    const valueChange = newValue - previousValue
    this.setState({sum: this.state.sum + valueChange})
  }

  render() {
    return (
      <div>
        <Counter onUpdate={this.onCounterUpdate} caption="s1" />
        <Counter onUpdate={this.onCounterUpdate} caption="s2" initValue={this.initValues[1]} />
        <Counter onUpdate={this.onCounterUpdate} caption="s3" initValue={this.initValues[2]} />
        <div>Total Count: {this.state.sum}</div>
      </div>
    )
  }
}

export default ControlPanel
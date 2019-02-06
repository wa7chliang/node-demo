import React, { Component, Fragment } from 'react';
import './style.css'
import { CSSTransition, TransitionGroup } from "react-transition-group";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show1: true,
      show: true,
      list: []
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleAddItem = this.handleAddItem.bind(this)
  }

  render() {
    return (
      <Fragment>
        <div className={this.state.show1? 'show': 'hide'}>
          hello world
        </div>
        <button onClick={this.handleToggle}>toggle</button>
        <CSSTransition
          in = {this.state.show}
          timeout = {1000}
          classNames = "fade"
          onEntered={(el) => {el.style.color = 'blue'}}
          appear = {true}>
          <div>hello</div>
        </CSSTransition>
        <TransitionGroup>
          {
            this.state.list.map((item, index) => {
              return (
                <CSSTransition
                  timeout = {1000}
                  classNames = "fade"
                  onEntered={(el) => {el.style.color = 'blue'}}
                  appear = {true}
                  key={index}>
                  <div>item</div>
                </CSSTransition>
              )
            })
          }
        </TransitionGroup>
        <button onClick={this.handleAddItem}>add</button>
      </Fragment>
    );
  }

  handleToggle() {
    this.setState({
      show: this.state.show ? false : true
    })
  }

  handleAddItem() {
    this.setState((prevState) => {
      return {
        list: [...prevState.list, 'item']
      }
    })
  }
}

export default App;

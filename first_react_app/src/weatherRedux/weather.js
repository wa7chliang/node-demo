import React, {Component} from 'react'
import {view as Weather} from './weather/'
import {connect} from 'react-redux'
import {actions as weatherActions} from './weather/'

const cityCode = '101280101'

class WeatherRedux extends Component {
  componentDidMount () {
    this.props.onSelectCity(cityCode)
  }
  
  render() {
    return (
      <div>
        <Weather />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectCity: (cityCode) => {
      dispatch(weatherActions.fetchWeather(cityCode));
    }
  }
}

export default connect(null, mapDispatchToProps)(WeatherRedux)
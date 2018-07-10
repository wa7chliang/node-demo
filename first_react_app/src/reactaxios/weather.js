import React from 'react'

// 广州的天气编号
const cityCode = 101280101

class Weather extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {weather: null}
  }

  // 在第一次渲染后调用，只在客户端,一般在此函数请求服务器的事情
  componentDidMount() {
    const apiUrl = `/data/cityinfo/${cityCode}.html`
    // fetch函数执行后会立即返回，返回一个Promise类型的对象，所以后面会跟上一大串then和catch的语句
    fetch(apiUrl).then((res) => {
      if (res.status !== 200) {
        throw new Error('Fail to get response with status ' + res.status)
      }
      res.json().then((resj) => {
        this.setState({weather: resj.weatherinfo})
      }).catch(e => {
        this.setState({weather: null})
      })
    }).catch(e => {
      this.setState({weather: null})
    })
  }

  render() {
    if (!this.state.weather) {
      return (
        <div>暂无数据</div>
      )
    }
    const {city, weather, temp1, temp2} = this.state.weather
    return (
      <div>
        {city} {weather} 最低气温 {temp1} 最高气温 {temp2}
      </div>
    )
  }
}

export default Weather
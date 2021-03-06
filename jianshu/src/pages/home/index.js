import React, {PureComponent} from 'react';
import {connect} from 'react-redux'
import {
  HomeWrapper,
  HomeLeft,
  HomeRight,
  BackTop
} from './style'
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writer'
import * as actionCreators from './store/actionCreators'

class Home extends PureComponent {
  handleScrollTop() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
        <HomeWrapper>
          <HomeLeft>
            <img className='banner-img' alt="" src='//upload.jianshu.io/admin_banners/web_images/4612/1e4eeb1b277034cca932f5e60e46d14b0629073b.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540' />
            <Topic />
            <List />
          </HomeLeft>
          <HomeRight>
            <Recommend />
            <Writer />
          </HomeRight>
          {this.props.showScroll? <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop>: null}
        </HomeWrapper>
      </div>
    )
  }
  componentDidMount() {
    this.props.changeHomeData()
    this.bindEvent()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.props.changeScrollTopShow)
  }

  bindEvent() {
    window.addEventListener('scroll', this.props.changeScrollTopShow)
  }
}

const mapState = (state) => ({
  showScroll: state.get('home').get('showScroll')
})

const mapDispath = (dispatch) => ({
  changeHomeData() {
    const action = actionCreators.getHomeInfo()
    dispatch(action)
  },
  changeScrollTopShow() {
    if (document.documentElement.scrollTop > 100) {
      dispatch(actionCreators.toggleTopShow(true))
    } else {
      dispatch(actionCreators.toggleTopShow(false))
    }
  }
})

export default connect(mapState, mapDispath)(Home)
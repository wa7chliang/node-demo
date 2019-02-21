import React, {Component} from 'react';
import {connect} from 'react-redux'
import {CSSTransition} from 'react-transition-group'
import * as actionCreators from './store/actionCreators'
import * as loginActionCreators from '../../pages/login/store/actionCreators'
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoItem,
  SearchWrapper,
  NavSearch,
  Addition,
  Btn
} from './style'
import {Link} from 'react-router-dom'

class Header extends Component {
  getListArea(){
    const {focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage} = this.props
    const newList = list.toJS()
    const pageList = []

    if (newList.length){
      for (let i = (page - 1) * 10; i < page * 10; i++ ) {
        if (newList[i]) {
          pageList.push(
            <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
          )
        }
      }
    }
    if (focused || mouseIn) {
      return (
        <SearchInfo 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage)}>换一换</SearchInfoSwitch>
          </SearchInfoTitle>
          <div>
            {pageList}
          </div>
        </SearchInfo>
      )
    } else {
      return null
    }
  }

  render(){
    const {focused, handleInputFocus, handleInputBlur, list, login, logout} = this.props
    return (
      <HeaderWrapper>
        <Link to='/'>
          <Logo />
        </Link>
        <Nav>
          <NavItem className='left active'>首页</NavItem>
          <NavItem className='left'>下载App</NavItem>
          {
            login?<NavItem onClick={logout} className='right'>退出</NavItem>: <Link to='/login'><NavItem className='right'>登陆</NavItem></Link>
          }
          <NavItem className='right'>Aa</NavItem>
          <SearchWrapper>
            <CSSTransition
              in={focused}
              timeout={200}  
              classNames="slide"
            >
              <NavSearch
                className={focused?'focused': ''}
                onFocus={() => handleInputFocus(list)}
                onBlur={handleInputBlur}
              ></NavSearch>
              </CSSTransition>
              <i 
                className={focused?'focused i': 'i'}>12</i>
              {this.getListArea()}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Link to='write'>
            <Btn className='writing'>写文章</Btn>
          </Link>
          <Btn className='red'>注册</Btn>
        </Addition>
      </HeaderWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    focused: state.get('header').get('focused'),
    list: state.get('header').get('list'),
    page: state.get('header').get('page'),
    totalPage: state.get('header').get('totalPage'),
    mouseIn: state.get('header').get('mouseIn'),
    login: state.get('login').get('login')
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    handleInputFocus(list) {
      (list.size === 0) && dispatch(actionCreators.getList())
      dispatch(actionCreators.searchFocus())
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur())
    },
    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter())
    },
    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave())
    },
    handleChangePage(page, totalPage) {
      if (page < totalPage) {
        dispatch(actionCreators.changePage(page + 1))
      } else {
        dispatch(actionCreators.changePage(1))
      }
    },
    logout() {
      dispatch(loginActionCreators.logout())
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Header)
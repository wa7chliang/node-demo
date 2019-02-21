import React, {PureComponent} from 'react';
import {connect} from 'react-redux'
import {ListItem, ListInfo, LoadMore} from '../style'
import * as actionCreators from '../store/actionCreators'
import {Link} from 'react-router-dom'

class List extends PureComponent {
  render() {
    const {list, getMoreList} = this.props
    return (
      <div>
        {
          list.map((item) => {
            return (
            <Link key={item.get('id')} to={'/detail/' + item.get('id')}>
              <ListItem>
                <img alt='' className='pic' src={item.get('imgUrl')} />
                <ListInfo>
                  <h3 className='title'>{item.get('title')}</h3>
                  <p className='desc'>{item.get('desc')}</p>
                </ListInfo>
              </ListItem>
            </Link>
            )
          })
        }
        <LoadMore onClick={getMoreList}>更多文字</LoadMore>
      </div>
    )
  }
}

const mapState = (state) => ({
  list: state.get('home').get('articleList')
})

const mapDispatch = (dispatch) => ({
  getMoreList() {
    dispatch(actionCreators.getMoreList())
  }
})

export default connect(mapState, mapDispatch)(List)
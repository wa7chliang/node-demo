import React, {PureComponent} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as actionCreators from './store/actionCreators'
import {
  DetailWrapper,
  Header,
  Content
} from './style'

class Detail extends PureComponent {
  render() {
    return (
      <DetailWrapper>
        <Header>{this.props.title}</Header>
        <Content dangerouslySetInnerHTML={{__html: this.props.content}}></Content>
      </DetailWrapper>
    )
  }
  componentDidMount(){
    this.props.getDetail(this.props.match.params.id)  //  把路由的id传递进来
  }
}

const mapState = (state) => ({
  title: state.getIn(['detail', 'title']),
  content: state.getIn(['detail', 'content'])
})

const mapDispatch = (dispatch) => ({
  getDetail(id) {
    dispatch(actionCreators.getDetail(id))
  }
})

export default connect(mapState, mapDispatch)(withRouter(Detail))
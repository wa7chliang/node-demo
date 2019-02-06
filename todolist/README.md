### react学习

`Fragment`标签：  替代最外层的div元素 并不显示最外层的div

`dangerouslySetInnerHTML` 等同于vue中的`v-html`

新版react推荐setState写法：
```
this.setState((prevState) => ({ //  prevState等同于this.state
  inputValue: value
}), () => {
  console.log('这里执行的是setState执行后的回调函数')
})
```

PropTypes:  父传子定义默认类型  等同于vue中的props:{}
```
组件.propTypes = {
  content: PropTypes.string.isRequired, //  isRequired为必须传
  handleItemDelete: PropTypes.func,
  index: PropTypes.number
}
```
defaultProps: 父没有传参数时的默认值
```
组件.defaultProps = {
  content: 'hello world'
}
```

ref属性 ref={(input) => {this.input = input}} 这里使用this.input就可以访问这个dom

在action里面：
使用了redux-thunk后 可以return函数 并且可以执行异步操作
```
export const getTodoList = () => {
  return (dispatch) => {} //  直接接收dispatch方法
}
```
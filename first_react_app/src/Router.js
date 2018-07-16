import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import Todo from './baseview/todo/todo'          // 原生简单todolist
import Weather from './reactaxios/weather'

const history = browserHistory
const Routes = () => (
  <Router history={browserHistory}>
    <Route path="Todo" component = {Todo} />
    <Route path="Weather" component = {Weather} />
    <Route path="*" component = {Todo} />
  </Router>
)

export default Routes
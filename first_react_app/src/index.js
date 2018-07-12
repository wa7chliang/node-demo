import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import store from './baseview/todoredux/store';
// import ClickCounter from './ClickCounter';
// import ControlPanel from './baseview/ControlPanel';
// import Counter from './redux/view/counter'
// import Todo from './baseview/todo/todo'          // 原生简单todolist
import Todo from './baseview/todoredux/view/todo'   // redux简单todolist
// import Weather from './reactaxios/weather'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Todo />
  </Provider>,
  // <Todo />,
  // <Weather />,
  document.getElementById('root')
);
registerServiceWorker();

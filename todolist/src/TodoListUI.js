// 无状态组件
import React from 'react';
import {Input, Button, List} from 'antd'
import 'antd/dist/antd.css'

const TodoListUI = (state) => {
  return (
    <div>
      <div>
        <Input
         value={state.inputValue} 
         placeholder="todoInfo" 
         style={{width: '300px', marginRight: '10px'}}
         onChange={state.handleInputChange}
        ></Input>
        <Button 
          type="primary"
          onClick={state.handleBtnClick}>提交</Button>
      </div>
      <List
        bordered
        dataSource={state.list}
        renderItem={(item, index) => (<List.Item 
                                        onClick={() => {state.handleItemDelete(index)}}
                                      >{item}</List.Item>)}
      />
    </div>
  )
}

export default TodoListUI
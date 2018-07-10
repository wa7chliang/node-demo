/*action*/

export const ONCLICKADDTODO = "todo/ONCLICKADDTODO";
export const HANDLECHANGE = "todo/HANDLECHANGE";
export const ONUPDATE = "todo/ONUPDATE";
export const ONDELETE = "todo/ONDELETE";

export function onClickaddTodo() {
  return {type: ONCLICKADDTODO}
}

export function handleChange(e) {
  return {type: HANDLECHANGE, e}
}

export function onUpdate(list) {
  return {type: ONUPDATE, list}
}

export function onDelete(list) {
  return {type: ONDELETE, list}
}

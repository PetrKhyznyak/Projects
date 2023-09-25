export  function getLocalStorageTodoList(owner) {
  if (!localStorage.getItem(owner)) {
    localStorage.setItem(owner, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(owner));

}


export  function createLsTodoItem({ owner, name }) {
  const todoItem = {
    name,
    owner,
    done: false,
    id: Date.now().toString()
  }
  console.log(todoItem.id)
  let lsArr =  getLocalStorageTodoList(owner);
  lsArr.push(todoItem)

  localStorage.setItem(owner, JSON.stringify(lsArr));

  return todoItem;
}


export  function switchLsTodoItemDone({ todoItem }) {
  let lsArr =  getLocalStorageTodoList(todoItem.owner)
  let index = 0;
  for (index; lsArr[index].id === todoItem.id; index++) {
    if (lsArr[index].id === todoItem.id) {
      todoItem.done = !todoItem.done;
      break
    }
  }

  console.log(1)
  lsArr[index].done = !lsArr[index].done;
  localStorage.setItem(todoItem.owner, JSON.stringify(lsArr))
}


export  function deleteTodoItemFromLs({element, todoItem }) {
  if (!confirm('Вы уверены?')) {
    return;
  }
  element.remove()
  let lsArr =  getLocalStorageTodoList(todoItem.owner)
  for (const lsArrKey in lsArr) {
    if (lsArr[lsArrKey].id === todoItem.id) {
      lsArr.splice(lsArrKey, 1);
      localStorage.setItem(todoItem.owner, JSON.stringify(lsArr))
      break
    }
  }

}

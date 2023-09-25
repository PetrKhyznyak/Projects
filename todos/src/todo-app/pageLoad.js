import {createTodoApp} from "./view.js";

export async function load(isLocalStorage, title, owner) {
  console.log(owner)
  let {
    createLsTodoItem,
    switchLsTodoItemDone,
    deleteTodoItemFromLs,
    getLocalStorageTodoList
  } = await import("./api/localStorageApi.js")
  const btn = [...document.getElementsByClassName('btn-info')][0]
  if (isLocalStorage === "true") {
    console.log(await getLocalStorageTodoList(owner))
    const todoItemList = await getLocalStorageTodoList(owner)
    btn.textContent = "Перейти на сервеное хранилище";
    console.log("LS")
    createTodoApp(document.getElementById('todo-app'), {
      title,
      owner,
      todoItemList,
      onCreateFormSubmit: createLsTodoItem,
      onDoneClick: switchLsTodoItemDone,
      onDeleteClick: deleteTodoItemFromLs
    })

  } else if (isLocalStorage === "false") {
    let {
      createTodoItem,
      switchTodoItemDone,
      deleteTodoItem,
      getServerTodoList
    } = await import("./api/serverApi.js")
    const todoItemList = await getServerTodoList(owner)
    btn.textContent = "Перейти на локальное хранилище";
    console.log("server")

    createTodoApp(document.getElementById('todo-app'), {
      title,
      owner,
      todoItemList,
      onCreateFormSubmit: createTodoItem,
      onDoneClick: switchTodoItemDone,
      onDeleteClick: deleteTodoItem
    })
  }
};

export async function storageSwitch(btn) {
  const container = document.getElementById("todo-app");
  let flag = localStorage.getItem("flag")
  console.log(flag)


  container.innerHTML = "";
  // localStorage.removeItem("flag");
  if (flag === "true") {
    console.log(1)
    flag = 'false';
    localStorage.setItem("flag", flag)

    console.log(flag)
    btn.textContent = "Перейти на сервеное хранилище";
  } else if (flag === "false") {
    console.log(2)
    flag = "true";
    localStorage.setItem("flag", flag)

    btn.textContent = "Перейти на локальное хранилище";
  }
}

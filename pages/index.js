import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Todo from "../components/Todo";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [tempTodos, setTempTodos] = useState([]);
  const [activeTodos, setActiveTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [activeFilterCode, setActiveFilterCode] = useState(1);
  const [darkMode, activateDarkMode] = useState(false);

  const addTodo = (event) => {
    console.log("working");
    event.preventDefault();
    if (todoTitle.trim() === "") return;
    let id = new Date().toISOString();
    let done = false;
    let data = { id, done, title: todoTitle };
    let newtodos = todos;
    newtodos.unshift(data);
    setTodos(newtodos);
    setTempTodos(newtodos);
    setTodoTitle("");
  };

  const deleteTodo = (id) => {
    const newTodos = [...todos.filter((todo) => todo.id !== id)];
    setTodos(newTodos);
    setTempTodos(newTodos);
  };

  const setDone = (id, done) => {
    let pos;
    let target = todos.find((todo, index) => {
      pos = index;
      return todo.id === id;
    });
    target.done = done;
    const newArr = [...todos];
    newArr[pos] = target;
    setTodos(newArr);
    setTempTodos(newArr);
  };

  const clearCompletedTasks = () => {
    const filteredArray = todos.filter((todo) => !todo.done);
    setTodos(filteredArray);
    setTempTodos(filteredArray);
  };

  const filterTodo = (e) => {
    const { filter } = e.target.dataset;

    switch (filter) {
      case "all":
        setTodos(tempTodos);
        setActiveFilterCode(1);
        break;
      case "active":
        console.log(tempTodos);
        const filterTodo = [...tempTodos].filter((todo) => todo.done !== true);
        if (filterTodo.length !== 0) {
          setTodos(filterTodo);
        }
        setActiveFilterCode(2);
        break;
      case "completed":
        const filterCompletedTodo = [...tempTodos].filter(
          (todo) => todo.done === true
        );
        if (filterCompletedTodo.length !== 0) {
          setTodos(filterCompletedTodo);
        }
        setActiveFilterCode(3);
        break;
      default:
        break;
    }
  };
  return (
    <div className={`${styles.container} ${darkMode && styles.darkMode}`}>
      <Head>
        <title>Todo</title>
        <meta
          name="description"
          content="Learning frontend with frontend mentor"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.todoContainer} `}>
        <div className={styles.head}>
          <h2>TODO</h2>
          {darkMode ? (
            <button
              className={styles.toggleButton}
              onClick={() => {
                activateDarkMode(true);
              }}
            >
              <Image
                src="/../public/assets/icon-moon.svg"
                alt="light background"
                width={25}
                height={25}
                className={styles.toggleImage}
              />
            </button>
          ) : (
            <button
              className={styles.toggleButton}
              onClick={() => {
                activateDarkMode(false);
              }}
            >
              <Image
                src="/../public/assets/icon-sun.svg"
                alt="dark background"
                width={25}
                height={25}
                className={styles.toggleImage}
              />
            </button>
          )}
        </div>
        <div className={styles.inputContainer}>
          <form onSubmit={addTodo}>
            <input
              type="text"
              placeholder="Create a new todo..."
              value={todoTitle}
              onChange={(e) => {
                setTodoTitle(e.target.value);
              }}
            />
          </form>
        </div>
        <div className={styles.todos}>
          <div className={styles.tContainer}>
            {!todos.length ? (
              <p className={styles.noTodos}>Your todo list bucket is empty</p>
            ) : (
              todos.map((todo, index) => {
                return (
                  <Todo
                    title={todo.title}
                    done={todo.done}
                    id={todo.id}
                    key={index}
                    deleteTodo={deleteTodo}
                    setDone={setDone}
                    pos={index}
                  />
                );
              })
            )}
          </div>

          <div className={styles.bottom}>
            <p>{todos.length} items left</p>
            <button
              className={styles.clearCompleted}
              onClick={clearCompletedTasks}
            >
              Clear Completed
            </button>
          </div>
        </div>

        <div className={styles.filter}>
          <button
            className={`${styles.filterButton} ${
              activeFilterCode === 1 && styles.active
            }`}
            data-filter="all"
            onClick={filterTodo}
          >
            All
          </button>
          <button
            className={`${styles.filterButton} ${
              activeFilterCode === 2 && styles.active
            }`}
            data-filter="active"
            onClick={filterTodo}
          >
            Active
          </button>
          <button
            className={`${styles.filterButton} ${
              activeFilterCode === 3 && styles.active
            }`}
            data-filter="completed"
            onClick={filterTodo}
          >
            Completed
          </button>
        </div>
        <p className={styles.dragAndDrop}>Drag and drop to reorder list</p>
      </div>
    </div>
  );
}

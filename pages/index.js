import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Todo from "../components/Todo";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");

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
    setTodoTitle("");
  };

  const deleteTodo = (id) => {
    const newTodos = [...todos.filter((todo) => todo.id !== id)];
    setTodos(newTodos);
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
  };

  const clearCompletedTasks = () => {
    const filteredArray = todos.filter((todo) => !todo.done);
    setTodos(filteredArray);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Learning frontend with frontend mentor"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.todoContainer}>
        <div className={styles.head}>
          <h2>TODO</h2>
          <Image
            src="/../public/assets/icon-moon.svg"
            alt="light background"
            width={25}
            height={25}
            className={styles.toggleImage}
          />
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
          <button className={`${styles.filterButton} ${styles.active}`}>
            All
          </button>
          <button className={styles.filterButton}>Active</button>
          <button className={styles.filterButton}>Completed</button>
        </div>
        <p className={styles.dragAndDrop}>Drag and drop to reorder list</p>
      </div>
    </div>
  );
}

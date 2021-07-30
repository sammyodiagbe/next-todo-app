import Image from "next/image";
import { useState } from "react";
import todo from "../styles/todo.module.css";

const Todo = ({ title, id, done, deleteTodo, setDone, pos }) => {
  const [isDone, setIsDone] = useState(false);
  return (
    <div className={todo.todoContainer} draggable onDragStart={() => null}>
      <div className={todo.leftContainer}>
        <label htmlFor={`todo-check${pos}`}>
          <input
            type="checkbox"
            name={`todo-check${pos}`}
            id={`todo-check${pos}`}
            onChange={(e) => {
              setDone(id, e.target.checked);
            }}
            checked={done}
          />
          <span className={todo.circle} />
        </label>
        <p className={`${todo.text} ${done ? todo.done : ""}`}>{title}</p>
      </div>

      <Image
        src="/../public/assets/icon-cross.svg"
        width={15}
        height={15}
        alt="remove todo"
        className={todo.closeimage}
        onClick={() => {
          deleteTodo(id);
        }}
      />
    </div>
  );
};

export default Todo;

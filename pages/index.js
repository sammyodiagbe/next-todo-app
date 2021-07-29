import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
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
          <input type="text" placeholder="Create a new todo..." />
        </div>
        <div className={styles.todos}>
          <div className={styles.atodo}></div>
          <div className={styles.bottom}>
            <p>5 items left</p>
            <button className={styles.clearCompleted}>Clear Completed</button>
          </div>
        </div>

        <div className={styles.filter}>
          <button className={styles.filterButton}>All</button>
          <button className={styles.filterButton}>Active</button>
          <button className={styles.filterButton}>Completed</button>
        </div>
        <p className={styles.dragAndDrop}>Drag and drop to reorder list</p>
      </div>
    </div>
  );
}

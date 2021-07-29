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
          <h1>Todo</h1>
          <Image
            src="/../public/assets/icon-moon.svg"
            alt="light background"
            width={50}
            height={50}
          />
        </div>
      </div>
    </div>
  );
}

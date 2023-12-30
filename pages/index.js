import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import atomOneDark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import { twi } from "tw-to-css";
import { CopyButton } from "../components/CopyButton";
import Footer from "../components/Footer";

export default function Home() {
  const [textarea, setTextArea] = useState("");
  const [css, setCSS] = useState("");

  function handleInputChange(event) {
    setTextArea(event.target.value);
  }

  async function getCSS(e) {
    e.preventDefault();
    let styles = twi(textarea);

    // Add space after each colon
    styles = styles.replace(/:/g, ": ");

    // Add new line after each rule
    styles = styles.replace(/;/g, ";\n");

    setCSS(styles);
  }

  const placeholder = `Enter tailwind utilities or HTML/JSX with class names \ne.g. grid grid-cols-1 gap-y-10 OR <div class="grid grid-cols-1 gap-y-10">`;

  return (
    <>
      <Head>
        <title>Tailwind to CSS</title>
        <meta
          name="description"
          content="Convert tailwind syntax to CSS syntax"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.h1}>Tailwind to CSS</h1>
        <form onSubmit={(e) => getCSS(e)}>
          <textarea
            className={styles.textarea}
            placeholder={placeholder}
            value={textarea}
            onChange={(e) => handleInputChange(e)}
            draggable="false"
          />
          <input type="submit" value="Convert" className={styles.submit} />
        </form>
        {css && (
          <>
            <CopyButton css={css} />
            <SyntaxHighlighter
              language="css"
              style={atomOneDark}
              className={styles.css}
            >
              {css}
            </SyntaxHighlighter>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

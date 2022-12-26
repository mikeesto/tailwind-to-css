import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import atomOneDark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { CopyButton } from "../components/CopyButton";
import Footer from "../components/Footer";

export default function Home() {
  const [textarea, setTextArea] = useState("");
  const [css, setCSS] = useState("");
  const [loading, setLoading] = useState(false);

  function handleInputChange(event) {
    setTextArea(event.target.value);
  }

  async function getCSS(e) {
    e.preventDefault();
    setCSS("");
    setLoading(true);

    fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(textarea),
    })
      .then((res) => res.json())
      .then((data) => {
        setCSS(data.css);
        setLoading(false);
      });
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
          {loading ? (
            <button className={styles.buttonload} disabled>
              <FontAwesomeIcon icon={faSpinner} spin={true} /> Loading
            </button>
          ) : (
            <input type="submit" value="Convert" className={styles.submit} />
          )}
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

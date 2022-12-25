import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styles from "../styles/CopyButton.module.css";

export function CopyButton({ css }) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    if (!clicked) {
      setClicked(true);
      navigator.clipboard.writeText(css);
      setTimeout(() => {
        setClicked(false);
      }, 1000);
    }
  }

  return (
    <button onClick={handleClick} className={styles.button}>
      <FontAwesomeIcon icon={clicked ? faCheck : faClipboard} /> Copy
    </button>
  );
}

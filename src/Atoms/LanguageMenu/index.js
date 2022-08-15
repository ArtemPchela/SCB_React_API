import React, {useState} from "react";
import styles from "./style.module.scss";

const languages = ["ENGLISH", "SWEDEN", "RUSSIAN"];

export default function LanguageMenu() {
  const [language, setLanguage] = useState("ENGLISH");
  const [active, setActive] = useState(false);

  const onClick = (element) => {
    setLanguage(element);
  }

  return (
    <div
      className={`${styles.languages} ${active ? styles.languages_active : ""}`}
      onClick={() => setActive(!active)}
    >
      <div>{language}</div>
      <ul className={`${styles.languages_list}`}>
        {languages.filter(element => element !== language)
          .map((element) =>
            <li key={element}
                onClick={() => onClick(element)}>{element}</li>
          )}

      </ul>
    </div>
  );
}

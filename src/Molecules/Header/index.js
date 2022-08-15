import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Link, NavLink } from "react-router-dom";
import NavMobile from "../../Atoms/NavMobile";
import links from "./links.json";
// import LanguageMenu from "../../Atoms/LanguageMenu";

export default function Header() {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const checkScroll = () => {
    window.scrollY > 100 ? setScroll(true) : setScroll(false);
  };

  return (
    <header
      className={`${styles.header} ${
        scroll ? styles.header_visible : styles.header
      }`}
    >
      {/*-----Nav Links Mobile-----*/}
      <NavMobile linksNav={links} />
      {/*-----Nav Links Mobile-----*/}

      <div className={`${styles.header_nav}`}>
        {links.map((element) => (
          <NavLink
            className={`${styles.header_nav_style}`}
            to={element.href}
            key={element.href}
            url={element.href}
            // exact={true}
            activeclassname={`${styles.header_nav_style_select}`}
          >
            {element.title}
          </NavLink>
        ))}
      </div>

      <div className={`${styles.header_logo}`}>
        <Link className={`${styles.header_logo_style}`} to={"/"}>
          <h3>
            <span className={`${styles.header_logo_style_first}`}>A</span>
            <span className={`${styles.header_logo_style_second}`}>P</span>
            <span className={`${styles.header_logo_style_third}`}>I</span>
          </h3>
        </Link>
      </div>

      <div className={`${styles.header_navRight}`}>
        {/*ToDo add translation on three lang*/}
        {/*-----Drop Down Menu Header-----*/}
        {/*<LanguageMenu className={`${styles.navMobile}`}/>*/}
        {/*-----Drop Down Menu Header-----*/}
      </div>
    </header>
  );
}

import React from "react";
import styles from "./style.module.scss";
import contact from "./StatisticsJSON/contact.json";
import personal from "./StatisticsJSON/personal.json";
import source from "./StatisticsJSON/source.json";

const yearNow = new Date().getFullYear();

export default function Footer() {
  return (
    <div className={`${styles.footer}`}>
      <div className="container">
        <div className={`row no-gutters ${styles.footer_sections}`}>

          <div className="col-12 col-md-6 col-lg-4">
            <div className={`${styles.footer_sections_section}`}>
              <h3>Source</h3>
              <ul>
                {source.map((el) => {
                  return (
                    <li key={el.id}>
                      <a href={el.path}>
                        {el.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>


          <div className="col-12 col-md-6 col-lg-4">
            <div className={`${styles.footer_sections_section}`}>
              <h3>Contact</h3>
              <ul>
                {contact.map((el) => {
                  return (
                    <li key={el.id}>
                      <a href={el.path}>
                        {el.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>


          <div className="col-12 col-md-6 col-lg-4">
            <div className={`${styles.footer_sections_section}`}>
              <h3>Personal</h3>
              <ul>
                {personal.map((el) => {
                  return (
                    <li key={el.id}>
                      <a href={el.path}>
                        {el.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm d-flex align-items-center justify-content-center mb-4 mt-4">
            <span>Author:</span>
            <h3 className={styles.author}> Artsiom</h3>
          </div>
          <div className="col-sm d-flex align-items-center justify-content-center mb-4 mt-4">
            &copy; {yearNow}
          </div>
        </div>
      </div>
    </div>
  );
}

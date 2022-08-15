import React from "react";
import styles from "./style.module.scss";

export default function Intro() {
  return (
    <div className={`${styles.intro}`}>
      <div className={`${styles.intro_container}`}>
        <div className={`${styles.intro_title}`}>
          <h1>
            Statistics Sweden provides society with useful and trusted
            statistics
          </h1>
        </div>
        <div className={`${styles.intro_desc}`}>
          <p className={`${styles.intro_desc_text}`}>
            Any defensive strategy can make use of an SCB site with a lot of
            resources. Both new and seasoned business owners will find this to
            be beneficial. It is simple to manipulate data and control business
            operations using data. By age and region, concentrate on the target
            audience. Or to comprehend how much the supply or demand has
            increased in a specific area.
          </p>
          <p className={`${styles.intro_desc_text}`}>
            The website is appropriate for students as well because they might
            find it useful for finding housing or learning which sector or
            industry is the most fruitful. And in the future, pick a career that
            you enjoy.
          </p>
        </div>
        <div className={styles.intro_original}>
          <a href="https://www.scb.se/">Visit SCB website</a>
        </div>
      </div>
    </div>
  );
}

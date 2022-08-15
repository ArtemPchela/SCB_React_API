import React from "react";
import styles from "./style.module.scss";
import email from './images/email.png';
import chat from './images/chat.gif';

export default function Contacts() {
  return (
    <div className={`${styles.contacts}`}>
      <div className={`${styles.contacts_wrapper}`}>
        <div className={`${styles.contacts_title}`}>
          <h3>If you have any questions you can contact me.</h3>
        </div>

        <div className="row no-gutters">
          <div className="col-12">
            <div className={`${styles.block}`}>
              <div className={`${styles.block_data}`}>
                <img src={email} alt="gif call me" style={{width: "75px"}}/>
                <a href="mailto:pchelenkovartem@gmail.com">pchelenkovartem@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="row no-gutters">
          <div className="col-12">
            <div className={`${styles.block}`}>
              <div className={`${styles.block_data}`}>
                <img src={chat} alt="gif call me"/>
                <a href="https://www.linkedin.com/in/artem-pchelenkov/">
                  Linkedin
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

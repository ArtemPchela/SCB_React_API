import React, { useState } from "react";
import styles from "./style.module.scss";
import { NavLink } from "react-router-dom";
import burgerClose from "./burgerImg/burgerClose.svg";
import burgerOpen from "./burgerImg/burgerOpen.svg";

export default function NavMobile({ linksNav }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const mobileOpenHandler = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className={`${styles.mobile_nav}`}>
      <div className={`${styles.mobile_menu} ${isMobileNavOpen ? styles.open : ""}`}>
        <div className={`${styles.mobile_close_icon_wrapper}`}>
          <div onClick={mobileOpenHandler}>
            <img
              src={burgerClose}
              width="25" alt="" />
          </div>
        </div>
        <div className={`${styles.mobile_links_wrapper}`}>
          <nav className={`${styles.nav_item}`}>
            {linksNav.map(element =>
              <NavLink onClick={mobileOpenHandler}
                       to={element.href}
                       key={element.href}
                       url={element.href}
                       className={`${styles.nav_item_mobile}`}
                       // exact={true}
                       activeclassname={`${styles.header_nav_style_select}`}
              >
                {element.title}
              </NavLink>)
            }
          </nav>
          <div className={`${styles.mobile_links_line}`} />
        </div>

      </div>
      <div className={`${styles.mobile_nav_wrapper}`}>
        <div className={`${styles.mobile_nav_main}`}>
          <div
            className={`${styles.mobile_menu_icon_open}`}
            onClick={mobileOpenHandler}
          >
            <img
              src={burgerOpen}
              width="25" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import styles from "./MainPage.module.css";
import mainImg from "../../../assets/homepage.png";
import lock from "../../../assets/lock.png";
export default function MainPage() {
  return (
    <div className={styles.mainPage}>
      <div>
        <img src={mainImg} />
      </div>
      <div>
        <h2 className="">Pocket Notes</h2>
      </div>
      <div>
        <p className={styles.mainText}>
          Send and receive messages without keeping your phone online. Use
          Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
      </div>
      <div className={styles.bottomLock}>
        <img src={lock} style={{ width: "20px" }} />
        <p>end-to-end encrypted</p>
      </div>
    </div>
  );
}

import { LOCK, UNLOCK } from "@consts/images";
import styles from "@/styles/consts/private.module.css";

export const usePrivate = (user) => {
  return user?.is_closed == 1 ? (
    <div className={styles.tooltip}>
      <img src={LOCK} />
      <div className={styles.tooltipText}>Profile is closed</div>
    </div>
  ) : (
    <div className={styles.tooltip}>
      <img src={UNLOCK} />
      <div className={styles.tooltipText}>Profile is open</div>
    </div>
  );
};

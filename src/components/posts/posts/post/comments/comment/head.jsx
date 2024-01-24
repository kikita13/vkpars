import styles from "@/styles/posts/comments/comment/head.module.css";
import { useOnline } from "@consts/hooks/online";
import { usePrivate } from "@consts/hooks/private";

const Head = (props) => {
  const { owner } = props;

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        {owner.name ? owner.name : `${owner.first_name} ${owner.last_name}`}{" "}
        {usePrivate(owner)}
      </div>
      <div className={styles.online}>
        {useOnline(owner)}
        <span>{owner.city?.title && ` (${owner?.city?.title})`}</span>
      </div>
    </div>
  );
};

export default Head;

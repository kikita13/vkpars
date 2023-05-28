import styles from "@/styles/posts/post/head.module.css";
import { LOCK, PINNED, UNLOCK } from "@consts/images";

const Head = (props) => {

  const { post } = props;

  return (
    <div className={styles.container}>
      <img 
        src={post.owner?.photo_50} 
        className={styles.photo} />
      <div className={styles.info}>
        <div className={styles.name}>
          {post.owner?.name
            ? post.owner?.name
            : `${post.owner?.first_name} ${post.owner?.last_name} `}
          {post.owner.is_closed == 1 
            ? (
            <div className={styles.tooltip}>
              <img src={LOCK} />
              <div className={styles.tooltipText}>Profile is closed</div>
            </div>
            ) 
            : (
            <div className={styles.tooltip}>
              <img src={UNLOCK} />
              <div className={styles.tooltipText}>Profile is open</div>
            </div>
            )
          }
        </div>
        <div className={styles.date}>
          {new Date(post.post?.date * 1000).toLocaleDateString()}
        </div>
      </div>
      {post.post?.is_pinned && <img src={PINNED} />}
    </div>
  );
};

export default Head;

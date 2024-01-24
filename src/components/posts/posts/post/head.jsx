import styles from "@/styles/posts/post/head.module.css";
import { usePrivate } from "@consts/hooks/private";
import { PINNED } from "@consts/images";

const Head = (props) => {
  const { post } = props;

  return (
    <div className={styles.container}>
      <img
        src={post.user.photo_50 || "https://vk.com/images/camera_200.png"}
        className={styles.photo}
      />
      <div className={styles.info}>
        <div className={styles.name}>
          {post.user.name
            ? post.user.name
            : `${post.user.first_name} ${post.user.last_name} `}
          {usePrivate(post.user)}
        </div>
        <div className={styles.date}>
          {new Date(post?.date * 1000).toLocaleDateString()}
        </div>
      </div>
      {post?.is_pinned && <img src={PINNED} />}
    </div>
  );
};

export default Head;

import styles from "@/styles/posts/comments/comment/comment.module.css";
import Head from "./head";
import Body from "./body";

const Comment = (props) => {
  const { comment, owner } = props;

  return (
    <div className={styles.container}>
      <img className={styles.photo} src={owner?.photo_50} />
      <div className={styles.info}>
        <Head owner={owner} />
        <Body comment={comment} />
      </div>
    </div>
  );
};

export default Comment;

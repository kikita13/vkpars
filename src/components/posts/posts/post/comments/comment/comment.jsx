import styles from "@/styles/posts/comments/comment/comment.module.css";
import Head from "./head";
import Body from "./body";

const Comment = (props) => {
  const { comment } = props;

  return (
    <div className={styles.container}>
      <div className={styles.comment}>
        <img className={styles.photo} src={comment.user.photo_50} />
        <div className={styles.info}>
          <Head owner={comment.user} />
          <Body comment={comment} />
        </div>
      </div>
      {/* {comment.thread.items && (
        <div className={styles.thread}>
          {comment.thread.items?.map((thread,index) => (
            <div key={index} className={styles.container}>
              <div className={styles.comment}>
                <img className={styles.photo} src={thread.user.photo_50} />
                <div className={styles.info}>
                  <Head owner={thread.user} />
                  <Body comment={thread} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Comment;

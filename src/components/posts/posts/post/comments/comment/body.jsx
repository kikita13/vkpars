import styles from "@/styles/posts/comments/comment/body.module.css";
import { useGetImage } from "@consts/hooks/attachments";

const Body = (props) => {
  const { comment } = props;

  return (
    <div className={styles.container}>
      <div className={styles.attachments}>
        {comment.attachments && comment.attachments?.map((attachment, index) => (
          <img
            key={index}
            className={styles.attachment}
            src={useGetImage(attachment)}
          />
        ))}
      </div>
      {comment.text}
    </div>
  );
};

export default Body;

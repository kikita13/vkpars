import styles from "@/styles/posts/post/body.module.css";
import { useGetImage } from "@consts/hooks/attachments";
import { useSplitText } from "@consts/hooks/splitText";
import Repost from "../repost/repost";

const Body = (props) => {
  const { post } = props;

  return (
    <div className={styles.container}>
      <div className={styles.text}>{useSplitText(post?.text)}</div>
      <div className={styles.attachments}>
        {post?.attachments?.map((attachment, index) => (
          <img
            key={index}
            className={styles.attachment}
            src={useGetImage(attachment)}
          />
        ))}
      </div>
      {post.copy_history && <Repost post={post} />}
    </div>
  );
};

export default Body;

import styles from '@/styles/posts/post/body.module.css'
import { useGetImage } from '@consts/hooks/attachments';
import { useSplitText } from '@consts/hooks/splitText';

const Body = (props) => {
  const {post} = props
  return (
    <div className={styles.container}>
      <div className={styles.text}>{useSplitText(post.post.text)}</div>
      <div className={styles.attachments}>
        {post.post.attachments?.map((attachment, index) => (<img key={index} className={styles.attachment} src={useGetImage(attachment)} />))}
      </div>
    </div>
  );
};

export default Body;
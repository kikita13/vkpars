import styles from '@/styles/posts/comments/comment/thread.module.css';

const Thread = (props) => {

  const { thread } = props

  return (
    <div className={styles.container}>
      {thread.text}
    </div>
  );
};

export default Thread;
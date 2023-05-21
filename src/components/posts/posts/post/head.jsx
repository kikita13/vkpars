import styles from '@/styles/posts/post/head.module.css'
import { PINNED } from '@consts/images';

const Head = (props) => {
  const {post} = props
  
  return (
    <div className={styles.container}>
      <img src={post.owner?.photo_50}  className={styles.photo}/>
      <div className={styles.info}>
        <div className={styles.name}>{post.owner?.name ? post.owner?.name : `${post.owner?.first_name} ${post.owner?.last_name} `}</div>
        <div className={styles.date}>{ new Date(post.post?.date*1000).toLocaleDateString()} {post.owner.is_closed == 1 ? ' страница закрыта' : '' }</div>
      </div>
      {post.post?.is_pinned && (<img src={PINNED}/>)}
    </div>
  );
};

export default Head;
import styles from '@/styles/posts/comments/comments.module.css'
import { useEffect } from 'react';
import Comment from './comment/comment';

const Comments = (props) => {
  const { post, comments } = props;
  const comment = post.post.id === comments?.post_id && comments;
  
  const info = comment.items?.map(item => {
    const owner = item.from_id == 0 
    ? {name: 'Profile is diactivated', photo_50: 'none', online:1} 
    : item.from_id > 0
    ? comment.profiles.find(acc => acc.id == item.from_id)
    : comment.groups.find(acc => acc.id == Math.abs(item.from_id))
    return {comment: item, owner: owner}
  })

  return (
    <div className={styles.container}>
      {info?.map((item, index) => <Comment 
      key={index} 
      comment={item.comment}
      owner={item.owner}
      />)}
    </div>
  );
};

export default Comments;
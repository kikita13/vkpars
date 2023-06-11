import styles from '@/styles/posts/comments/comments.module.css'
import Comment from './comment/comment';

const Comments = (props) => {

  const { post, city, keyword, ageOver, ageLess} = props;
  
  
  return (
    <div className={styles.container}>
      {post.comments.items?.map((comment, index) => <Comment keyword={keyword} city={city} ageOver={ageOver} ageLess={ageLess}
      key={index} 
      comment={comment}
      />)}
    </div>
  );
};

export default Comments;
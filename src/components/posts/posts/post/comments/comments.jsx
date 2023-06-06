import styles from '@/styles/posts/comments/comments.module.css'
import Comment from './comment/comment';

const Comments = (props) => {

  const { post, city, keyword, ageOver, ageLess } = props;
  

  const displayedComments = post.comments.items
  ?.filter( post => keyword   ? post.text.toLowerCase().includes(keyword.toLowerCase()) : true)
  ?.filter( post => city      ? post.user.city?.title.toLowerCase() === city.toLowerCase() : true)
  ?.filter( post => ageLess   ? useAges(post.user?.bdate)            <= ageLess             : true)
  ?.filter( post => ageOver   ? useAges(post.user?.bdate)            >= ageOver             : true)
  

  return (
    <div className={styles.container}>
      {displayedComments?.map((comment, index) => <Comment keyword={keyword} city={city} ageOver={ageOver} ageLess={ageLess}
      key={index} 
      comment={comment}
      />)}
    </div>
  );
};

export default Comments;
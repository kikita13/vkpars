import styles from '@/styles/comments/comments.module.css'
import Account from '@components/account/account';
import Post from '@components/posts/posts/post/post';
import { useSelector } from 'react-redux';

const Comments = (props) => {
  
  const { keyword, city, ageOver, ageLess } = props
  const posts = useSelector(state => state.comments.comments)

  return (
    <div className={styles.container}>
      {posts.account && <Account  account={posts.account} countPosts={posts.count} />}  
      {posts.posts?.map((post, index) => <Post  key={index} post={post}  keyword={keyword} city={city} ageOver={ageOver} ageLess={ageLess} />)}
    </div>
  );
};

export default Comments;
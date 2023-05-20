import styles from '@/styles/posts/posts/posts.module.css'
import { useSelector } from 'react-redux';
import Post from './post/post';

const Posts = () => {
  const posts = useSelector(state => state.posts.posts)

  const info = posts?.items?.map((item) => {
    const owner = +item?.from_id < 0
      ? posts.groups.find((group) => group.id == Math.abs(+item.owner_id))
      : posts.profiles.find((profile) => profile.id == item.from_id);
    
    return {
      post: item,
      owner: owner,
    };
  });
  
  console.log(info);

  return (
    <div className={styles.container}>
      {info?.map((post, index) => (<Post key={index} post={post}/>))}
    </div>
  );
};

export default Posts;
import styles from '@/styles/comments/comments.module.css'
import Account from '@components/account/account';
import Post from '@components/posts/posts/post/post';
import { useScroll } from '@consts/hooks/scroll';
import { ARROWUP } from '@consts/images';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Comments = (props) => {
  
  const { keyword, city, ageOver, ageLess } = props
  const {posts, status} = useSelector(state => state.comments)

  const scrollPosition = useScroll();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 100;
  const displayed = posts?.posts?.slice(0, currentPage * postsPerPage);
  const loadNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const loadAllPage = () => setCurrentPage(posts.posts.length);

  return status == 'fulfilled' ? (
    <div className={styles.container}>
      {posts.account && <Account  account={posts.account[0]} countPosts={posts.count} />}  
      {displayed?.map((post, index) => <Post  key={index} post={post}  keyword={keyword} city={city} ageOver={ageOver} ageLess={ageLess} />)}
      <div
        className={
          scrollPosition >= 2000
            ? `${styles.scroll} ${styles.scrollActive}`
            : styles.scroll
        }
        onClick={() => scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      >
        <img src={ARROWUP} />
      </div>
      {displayed?.length < posts.posts?.length && (
        <div className={styles.buttons}>
          <div className={styles.button} onClick={() => loadNextPage()}>
            Load More
          </div>
          <div className={styles.button} onClick={() => loadAllPage()}>
            Load All
          </div>
        </div>
      )}
    </div>
  ) : status;
};

export default Comments;
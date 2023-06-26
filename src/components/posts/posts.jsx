import { useState } from "react";
import styles from "@/styles/posts/posts.module.css";
import { useSelector } from "react-redux";
import Post from "./posts/post/post";
import { ARROWUP } from "@consts/images";
import { useScroll } from "@consts/hooks/scroll";
import Account from "@components/account/account";

const Posts = (props) => {
  
  const {posts, status} = useSelector((state) => state.posts);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 100;
  const loadNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const loadAllPage = () => setCurrentPage(posts.posts.length);

  const displayedPosts = posts?.posts?.slice(0, currentPage * postsPerPage);

  const scrollPosition = useScroll();
  return status == 'fulfilled' ? (
    <div className={styles.container}>
      {posts.account && <Account  account={posts.account[0]} countPosts={posts.count} />}  
      {displayedPosts?.map((post, index) => (
        <Post key={index} post={post}/>
      ))}
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
      {displayedPosts?.length < posts.posts?.length && (
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

export default Posts;

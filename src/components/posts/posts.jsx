import { useState } from "react";
import styles from "@/styles/posts/posts.module.css";
import { useDispatch, useSelector } from "react-redux";
import Post from "./posts/post/post";
import { useAges } from "@consts/hooks/ages";
import { ARROWUP } from "@consts/images";
import { useScroll } from "@consts/hooks/scroll";
import Account from "@components/account/account";
import { fetchComment } from "@redux/slices/comment";

const Posts = (props) => {
  
  const { city, keyword, ageOver, ageLess } = props;

  const posts = useSelector((state) => state.posts.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 100;
  const loadNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const loadAllPage = () => setCurrentPage(posts.length);

  const displayedPosts = posts.posts
    ?.filter( post => keyword   ? post.text.toLowerCase().includes(keyword.toLowerCase()) : true)
    ?.filter( post => city      ? post.user.city?.title.toLowerCase() === city.toLowerCase() : true)
    ?.filter( post => ageLess   ? useAges(post.user?.bdate)            <= ageLess             : true)
    ?.filter( post => ageOver   ? useAges(post.user?.bdate)            >= ageOver             : true)
    .slice(0, currentPage * postsPerPage);

const dispatch = useDispatch()
const handleComment = (props) => {
  dispatch(fetchComment(props))
}
  
  const comment = useSelector(state => state.comment.comment)

  const scrollPosition = useScroll();
  const account = posts.account
  return (
    <div className={styles.container}>
      {account && <Account  account={account} countPosts={posts.count} />}  
      {displayedPosts?.map((post, index) => (
        <Post key={index} post={post} comment={comment} handleComment={handleComment}/>
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
      {displayedPosts?.length < posts?.length && (
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
  );
};

export default Posts;

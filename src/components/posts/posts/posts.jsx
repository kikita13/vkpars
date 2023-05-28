import { useState } from "react";
import styles from "@/styles/posts/posts/posts.module.css";
import { useSelector } from "react-redux";
import Post from "./post/post";
import { useAges } from "@consts/hooks/ages";
import { ARROWUP } from "@consts/images";
import { useScroll } from "@consts/hooks/scroll";
import Account from "@components/account/account";

const Posts = (props) => {
  
  const { city, keyword, ageOver, ageLess } = props;

  const posts = useSelector((state) => state.posts.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 100;
  const loadNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const loadAllPage = () => setCurrentPage(info.length);
  const info = posts?.items?.map((item) => {
    const owner =
      +item?.from_id < 0
        ? posts.groups.find((group) => group.id == Math.abs(+item.owner_id))
        : posts.profiles.find((profile) => profile.id == item.from_id);
    const repost =
      item.copy_history && +item?.copy_history[0]?.from_id < 0
        ? posts.groups.find(
            (group) => group.id == Math.abs(+item.copy_history[0].owner_id)
          )
        : posts.profiles.find(
            (profile) =>
              item.copy_history && profile.id == +item.copy_history[0].from_id
          );

    return {
      post: item,
      owner: owner,
      repost:
        item.copy_history && item.copy_history.length > 0
          ? {
              post: item.copy_history[0],
              owner: repost,
            }
          : null,
    };
  });

  const displayedPosts = info
    ?.filter( post => keyword   ? post.post.text.toLowerCase().includes(keyword.toLowerCase()) : true)
    ?.filter( post => city      ? post.owner?.city?.title.toLowerCase() === city.toLowerCase() : true)
    ?.filter( post => ageLess   ? useAges(post.owner?.bdate)            <= ageLess             : true)
    ?.filter( post => ageOver   ? useAges(post.owner?.bdate)            >= ageOver             : true)
    .slice(0, currentPage * postsPerPage);


  const scrollPosition = useScroll();
  const account = posts.account
  return (
    <div className={styles.container}>
      {account && <Account  account={account} countPosts={posts.count} />}  
      {displayedPosts?.map((post, index) => (
        <Post key={index} post={post} />
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
      {displayedPosts?.length < info?.length && (
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

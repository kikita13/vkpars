import styles from "@/styles/posts/posts/posts.module.css";
import { useSelector } from "react-redux";
import Post from "./post/post";

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);

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
        : posts.profiles.find((profile) => {
            null && profile.id == +item.copy_history[0].from_id;
          });

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

  return (
    <div className={styles.container}>
      {info?.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};

export default Posts;

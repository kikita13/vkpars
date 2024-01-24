import Head from "./head";
import Body from "./body";
import Footer from "./footer/footer";
import styles from "@/styles/posts/post/post.module.css";
import Comments from "./comments/comments";

const Post = (props) => {
  const { post, city, keyword, ageOver, ageLess } = props;

  return (
    (post.comments.items && post.comments.items.length > 0 && (
      <div className={styles.container}>
        <Head post={post} />

        <Body post={post} />

        <Footer post={post} />

        <Comments
          keyword={keyword}
          city={city}
          ageOver={ageOver}
          ageLess={ageLess}
          post={post}
        />
      </div>
    )) ||
    (!post.comments.items && (
      <div className={styles.container}>
        <Head post={post} />

        <Body post={post} />

        <Footer post={post} />
        
        <Comments
          keyword={keyword}
          city={city}
          ageOver={ageOver}
          ageLess={ageLess}
          post={post}
        />
      </div>
    ))
  );
};

export default Post;

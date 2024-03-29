import Head from "./head";
import Body from "./body";
import Footer from "./footer/footer";
import styles from "@/styles/posts/post/post.module.css";
import Comments from "./comments/comments";

const Post = (props) => {
  const { post, city, keyword, ageOver, ageLess } = props;

  return (

      <div className={styles.container}>
        <Head post={post} />

        <Body post={post} />

        <Footer post={post} />

        {post.comments.items && (<Comments
          keyword={keyword}
          city={city}
          ageOver={ageOver}
          ageLess={ageLess}
          post={post}
        />)}
      </div>

  );
};

export default Post;

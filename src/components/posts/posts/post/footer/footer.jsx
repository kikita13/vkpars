import React from "react";
import styles from "@/styles/posts/post/footer.module.css";
import Actions from "./actions";
import { COMMENTS, EYE, HEART, LINK, REPOST } from "@consts/images";
import Links from "./links";

const Footer = (props) => {

  const { post } = props;
  
  return (
    <div className={styles.footer}>
      <div className={styles.actions}>
        <Actions 
          styles={styles} 
          icon={HEART} 
          text={post.post?.likes?.count} />
        <Actions
          styles={styles}
          icon={COMMENTS}
          text={post.post?.comments?.count}
        />
        <Actions
          styles={styles}
          icon={REPOST}
          text={post.post?.reposts?.count}
        />
        <Actions 
          styles={styles} 
          icon={EYE} 
          text={post.post?.views?.count} />
      </div>
      <div className={styles.links}>
        <Links 
          styles={styles} 
          icon={LINK} 
          text="Page" 
          post={post} />
        <Links 
          styles={styles} 
          icon={LINK} 
          text="Post" 
          post={post} />
      </div>
    </div>
  );
};

export default Footer;

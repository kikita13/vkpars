import React from 'react';
import Head from './head';
import Body from './body';
import Footer from './footer/footer';
import styles from '@/styles/posts/post/post.module.css'
import Comments from './comments/comments';


const Post = (props) => {
  const {post, handleComment, comment} = props
  const comments = comment.find(c => c.post_id == post.post.id)
  return (
    <div className={styles.container}>
      <Head   post={post}/>
      <Body   post={post}/>
      <Footer handleComment={handleComment} post={post}/>
      {comments && <Comments post={post} comments={comments}/> }
    </div>
  );
};

export default Post;
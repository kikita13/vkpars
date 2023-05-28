import React from 'react';
import Head from './head';
import Body from './body';
import Footer from './footer/footer';
import styles from '@/styles/posts/post/post.module.css'

const Post = (props) => {
  
  const {post} = props
  
  return (
    <div className={styles.container}>
      <Head   post={post}/>
      <Body   post={post}/>
      <Footer post={post}/>
    </div>
  );
};

export default Post;
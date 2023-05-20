import React from 'react';
import Head from '../post/head';
import styles from '@/styles/posts/repost/repost.module.css'
import Body from '../post/body';

const Repost = (props) => {
  const {post} = props

  return (
    <div className={styles.container}>
      <Head post={post.repost}/>
      <Body post={post.repost}/>
    </div>
  );
};

export default Repost;
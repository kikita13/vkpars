import React from 'react';
import Head from './head';
import Body from './body';
import Footer from './footer';

const Post = (props) => {
  const {post} = props
  return (
    <div>
      <Head post={post}/>
      <Body post={post}/>
      <Footer post={post}/>
    </div>
  );
};

export default Post;
import { usePage, usePost } from '@consts/hooks/link';
import React from 'react';

const Links = (props) => {
  const {styles, icon, text, post} = props
  
  return (
    <div 
      className={styles.action} 
      onClick={() => {
        text == 'Page' 
        ? usePage(post.owner) 
        : usePost(post.post)
      }}>
      <img className={styles.icon} src={icon}/>
      <div className={styles.count}>{text}</div>
    </div>
  );
};

export default Links;
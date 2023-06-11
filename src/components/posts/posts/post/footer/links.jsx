import { usePage, usePost, useComment } from '@consts/hooks/link';
import React from 'react';

const Links = (props) => {
  
  const {styles, icon, text, post, comment} = props
  
  return (
    <div 
      className={styles.action} 
      onClick={() => {
        if(text == 'Page'){
          usePage(post.user) 
        } else if(text == "Post"){
          usePost(post)
        } else if(text == "Comment") {
          useComment(comment)
        }
      }}>
      <img className={styles.icon} src={icon}/>
      <div className={styles.count}>{text}</div>
    </div>
  );
};

export default Links;
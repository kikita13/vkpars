import React from 'react';

const Actions = (props) => {
  const {styles, icon, text} = props
  
  return (
    <div className={styles.action}>
      <img className={styles.icon} src={icon}/>
      <div className={styles.count}>{text}</div>
    </div>
  );
};

export default Actions;
import styles from '@/styles/posts/menu/button.module.css'

const Button = (props) => {

  const {handleClick, id, maxPosts, keyword, city, ageOver, ageLess, firstName, lastName} = props
  
  return (
    <div onClick={() => handleClick({id, maxPosts, keyword, city, ageOver, ageLess, firstName, lastName})} className={styles.button}>Start</div>
  );
};

export default Button;
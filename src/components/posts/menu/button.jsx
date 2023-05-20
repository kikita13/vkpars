import styles from '@/styles/posts/menu/button.module.css'

const Button = (props) => {
  const {handleClick, id, maxPosts} = props
  return (
    <div onClick={() => handleClick({id, maxPosts})} className={styles.button}>Start</div>
  );
};

export default Button;
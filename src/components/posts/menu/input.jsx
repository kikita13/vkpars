import styles from '@/styles/posts/menu/input.module.css'

const Input = (props) => {

  const {text, setValue} = props
  
  return (
    <input 
      type="text" 
      placeholder={text} 
      className={styles.input}
      onChange={(e) => setValue(e.target.value)}  
    />
  );
};

export default Input;
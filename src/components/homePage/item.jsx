import styles from "@/styles/homePage/item.module.css";

const Item = (props) => {
  const { item } = props;

  return (
    <div className={styles.container}>
      <div className={styles.title}>{item.title}</div>
      
      <div className={styles.text}>{item.text}</div>
    </div>
  );
};

export default Item;

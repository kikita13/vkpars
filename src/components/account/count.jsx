import styles from '@/styles/account/count.module.css';

const Count = (props) => {

  const {count, title} = props

  return ( count ?
    (<div className={styles.container}>
      <div className={styles.count}>{count}</div>
      <div className={styles.title}>{title}</div>
    </div>
  ): true) ;
};

export default Count;
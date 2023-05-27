import styles from '@/styles/users/user/body.module.css'

const Body = (props) => {
  
  const {user} = props

  return (
    <div className={styles.container}>
      {user.id && (<div className={styles.item}>{`Id: ${user.id}`}</div>)}
      {user.sex && (<div className={styles.item}>{`Sex: ${user.sex == 2 ? 'Male' : 'Female'}`}</div>)}
      {user.bdate && (<div className={styles.item}>{`Date of Birth: ${user.bdate}`}</div>)}
      {user.city && (<div className={styles.item}>{`City: ${user.city.title}`}</div>)}
      {user.country && (<div className={styles.item}>{`Country: ${user.country.title}`}</div>)}
      {user.domain && (<div className={styles.item}>{`Domain: ${user.domain}`}</div>)}
      {user.status && (<div className={styles.item}>{`Status: ${user.status}`}</div>)}
    </div>
  );
};

export default Body;
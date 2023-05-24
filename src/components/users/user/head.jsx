import styles from '@/styles/users/user/head.module.css'
import { LOCK, UNLOCK } from '@consts/images';

const Head = (props) => {

  const {user} = props

  return (
    <div className={styles.container}>
      <img className={styles.photo} src={user.photo_50} />
      <div className={styles.info}>
        <div className={styles.name}>{`${user.first_name} ${user.last_name}`}</div>
        {user.online == 1
        ? (<div className={styles.online}>online</div>)
        : (<div className={styles.date}>
          {`last seen at ${new Date(user?.last_seen?.time*1000).toLocaleDateString()} 
          ${new Date(user?.last_seen?.time*1000).toLocaleTimeString()}`}
        </div>)
        }
      </div>
      {user.is_closed == 1 ? (<img src={LOCK}/>) : (<img src={UNLOCK}/>)}
    </div>
  );
};

export default Head;
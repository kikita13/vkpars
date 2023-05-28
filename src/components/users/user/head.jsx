import styles from '@/styles/users/user/head.module.css'
import { useOnline } from '@consts/hooks/online';
import { usePrivate } from '@consts/hooks/private';
import { LOCK, UNLOCK } from '@consts/images';

const Head = (props) => {

  const {user} = props

  return (
    <div className={styles.container}>
      <img className={styles.photo} src={user.photo_50} />
      <div className={styles.info}>
        <div className={styles.name}>{`${user.first_name} ${user.last_name}`}</div>
          {useOnline(user)}
      </div>
      {usePrivate(user)}
    </div>
  );
};

export default Head;
import styles from '@/styles/account/account.module.css';
import Count from './count';
import Body from './body';

const Account = (props) => {

  const { account, countPosts } = props
  const acc = account[0]
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={acc.photo_100} className={styles.photo}/>
        <div className={styles.counts}>
          <Count title='Posts' count={countPosts}/>
          <Count title='Friends' count={acc?.counters?.friends}/>
          <Count title='Followers' count={acc?.counters?.followers}/>
          <Count title='Members' count={acc?.members_count}/>
        </div>
      </div>
      <Body account={acc} />
    </div>
  );
};

export default Account;
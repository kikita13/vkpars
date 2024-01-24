import styles from "@/styles/account/account.module.css";
import Count from "./count";
import Body from "./body";

const Account = (props) => {
  const { account } = props;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={account?.photo_100} className={styles.photo} />
        <div className={styles.counts}>
          <Count title="Posts" count={account?.counters?.posts} />
          <Count title="Friends" count={account?.counters?.friends} />
          <Count title="Followers" count={account?.counters?.followers} />
          <Count title="Members" count={account?.members_count} />
        </div>
      </div>
      <Body account={account} />
    </div>
  );
};

export default Account;

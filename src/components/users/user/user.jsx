import styles from '@/styles/users/user/user.module.css'
import Head from './head';
import Body from './body';
import Footer from './footer';

const User = (props) => {
  
  const {user} = props
  
  return (
    <div className={styles.container}>
      <Head user={user} />
      <Body user={user} />
      <Footer user={user} />
    </div>
  );
};

export default User;
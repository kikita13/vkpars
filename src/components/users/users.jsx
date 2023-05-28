import styles from "@/styles/users/users/users.module.css";
import { useSelector } from "react-redux";
import User from "./user/user";
import { useSex } from "@consts/hooks/sex";
import { useAges } from "@consts/hooks/ages";
import { ARROWUP } from "@consts/images";
import { useScroll } from "@consts/hooks/scroll";
import Account from "@components/account/account";

const Users = (props) => {

  const {firstName, lastName, ageOver, ageLess, city, sex} = props
  const users = useSelector(state => state.friends.friends.length !== 0 ? state.friends.friends : state.members.members)
  const scrollPosition = useScroll();
  const account = users.account && users.account[0]
  return (
    <div className={styles.container}>
      {account && <Account  account={account}  />}  

    <div className={styles.items}>
      {users?.items?.items
      ?.filter( user => firstName ? user.first_name.toLowerCase()     == firstName.toLowerCase()  : true)
      ?.filter( user => lastName  ? user.last_name.toLowerCase()      == lastName.toLowerCase()   : true)
      ?.filter( user => ageOver   ? useAges(user?.bdate)              >= ageOver                  : true)
      ?.filter( user => ageLess   ? useAges(user?.bdate)              <= ageLess                  : true)
      ?.filter( user => city      ? user?.city?.title?.toLowerCase()  == city?.toLowerCase()      : true)
      ?.filter( user => sex       ? useSex(user?.sex).toLowerCase()   == sex?.toLowerCase()       : true)      
      ?.map((user, index) => (
        <User key={index} user={user}/>
      ))}
      <div
      className={
        scrollPosition >= 2000
          ? `${styles.scroll} ${styles.scrollActive}`
          : styles.scroll
        }
        onClick={() => scrollTo({ top: 0, left: 0, behavior: "smooth" })}>
        <img src={ARROWUP} />
      </div>
    </div>
    </div>
  );
};

export default Users;
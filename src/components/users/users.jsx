import styles from "@/styles/users/users/users.module.css";
import { useSelector } from "react-redux";
import User from "./user/user";
import { useSex } from "@consts/hooks/sex";
import { useAges } from "@consts/hooks/ages";

const Users = (props) => {

  const {firstName, lastName, ageOver, ageLess, city, sex} = props
  const users = useSelector(state => state.friends.friends)
  console.log(users);
  
  return (
    <div className={styles.container}>
      {users?.items
      ?.filter( user => firstName ? user.first_name.toLowerCase() == firstName.toLowerCase() : true)
      ?.filter( user => lastName  ? user.last_name.toLowerCase() == lastName.toLowerCase() : true)
      ?.filter( user => ageOver   ? useAges(user?.bdate) >= ageOver : true)
      ?.filter( user => ageLess   ? useAges(user?.bdate) <= ageLess : true)
      ?.filter( user => city      ? user?.city?.title?.toLowerCase() == city?.toLowerCase() : true)
      ?.filter( user => sex       ? useSex(user?.sex).toLowerCase() == sex?.toLowerCase() : true)
      
      
      .map((user, index) => (
        <User key={index} user={user}/>
      ))}
    </div>
  );
};

export default Users;
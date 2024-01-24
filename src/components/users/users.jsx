import styles from "@/styles/users/users/users.module.css";
import { useSelector } from "react-redux";
import User from "./user/user";
import { ARROWUP } from "@consts/images";
import { useScroll } from "@consts/hooks/scroll";
import Account from "@components/account/account";
import { useState } from "react";

const Users = (props) => {
  const { users, status } = useSelector((state) =>
    state.friends.users.length !== 0 ? state.friends : state.members
  );
  const scrollPosition = useScroll();
  console.log(status);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 100;
  const loadNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const loadAllPage = () => setCurrentPage(users.users.length);

  const displayedUsers = users?.users?.slice(0, currentPage * postsPerPage);

  return status == "fulfilled" ? (
    <div className={styles.container}>
      {users.account && <Account account={users.account} />}

      <div className={styles.items}>
        {displayedUsers?.map((user, index) => (
          <User key={index} user={user} />
        ))}
        <div
          className={
            scrollPosition >= 2000
              ? `${styles.scroll} ${styles.scrollActive}`
              : styles.scroll
          }
          onClick={() => scrollTo({ top: 0, left: 0, behavior: "smooth" })}
        >
          <img src={ARROWUP} />
        </div>
      </div>
      {displayedUsers?.length < users.users?.length && (
        <div className={styles.buttons}>
          <div className={styles.button} onClick={() => loadNextPage()}>
            Load More
          </div>
          <div className={styles.button} onClick={() => loadAllPage()}>
            Load All
          </div>
        </div>
      )}
    </div>
  ) : (
    status
  );
};

export default Users;

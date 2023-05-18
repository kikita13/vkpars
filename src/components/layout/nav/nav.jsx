import styles from "@/styles/layout/nav/nav.module.css";
import { NAV } from "@consts/nav";
import Link from "next/link";

const Nav = () => {
  return (
    <div className={styles.container}>
      {NAV.map((item) => (
        <Link key={item.id} href={item.path} className={styles.item}>
          <div>{item.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default Nav;

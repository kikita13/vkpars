import styles from "@/styles/users/user/footer.module.css";
import { usePage } from "@consts/hooks/link";
import { LINK } from "@consts/images";

const Footer = (props) => {
  const { user } = props;

  return (
    <div className={styles.container} onClick={() => usePage(user)}>
      <img src={LINK} />
      <div className={styles.text}>Page</div>
    </div>
  );
};

export default Footer;

import styles from '@/styles/layout/footer/footer.module.css'
import { FOOTER } from '@consts/footer';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className={styles.container}>
    {FOOTER.map((item) => (
      <Link key={item.id} href={item.path} className={styles.item}>
        <img className={styles.icon} src={item.icon} /><div>{item.title}</div>
      </Link>
    ))}
  </div>
  );
};

export default Footer;
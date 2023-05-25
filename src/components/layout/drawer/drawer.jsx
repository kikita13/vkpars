import { NAV } from '@consts/nav';
import styles from '@/styles/layout/drawer/drawer.module.css'
import Link from 'next/link';
import { NAVDRAWER } from '@consts/images';
import { useState } from 'react';

const Drawer = ( ) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className={styles.container}><img onClick={() => setIsOpen(!isOpen)} className={styles.icon} src={NAVDRAWER}/><div className={styles.text}>VK Parser</div>
      <div className={isOpen ? `${styles.drawer} ${styles.active}`: styles.drawer}>
      {NAV.map((item) => (
        <Link onClick={() => setTimeout(() => {setIsOpen(false)},500)} key={item.id} href={item.path} className={styles.item}>
          <div>{item.title}</div>
        </Link>
      ))}
      </div>
    </div>
  );
};

export default Drawer;
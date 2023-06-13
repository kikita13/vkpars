import styles from '@/styles/homePage/index.module.css';
import { HOMEPAGEITEMS } from '@consts/homePage';
import Item from './item';
const Index = () => {
  return (
    <div className={styles.container}>
      {HOMEPAGEITEMS.map(item => <Item item={item}/>)}
    </div>
  );
};

export default Index;
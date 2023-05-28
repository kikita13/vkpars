import styles from '@/styles/account/body.module.css';
import Count from './count';
import { useOnline } from '@consts/hooks/online';
import { useSplitText } from '@consts/hooks/splitText';
import { useSex } from '@consts/hooks/sex';
import { usePrivate } from '@consts/hooks/private';

const Body = (props) => {

  const {account} = props

  return (
    <div className={styles.container}>
      <Count title='Is Closed'      count={usePrivate(account)}                                   />
      <Count title='Online'         count={account.type !== 'group' ? useOnline(account) : false} />
      <Count title='First Name'     count={account.first_name}                                    />
      <Count title='Last Name'      count={account.last_name}                                     />
      <Count title='Name'           count={account.name}                                          />
      <Count title='Id'             count={account.id}                                            />
      <Count title='Sex'            count={account.type !== 'group' ? useSex(account.sex) : false}/>
      <Count title='Domain'         count={account.domain}                                        />
      <Count title='Screen Name'    count={account.screen_name}                                   />
      <Count title='Birth Date'     count={account.bdate}                                         />
      <Count title='Country'        count={account.country.title}                                 />
      <Count title='City'           count={account.city.title}                                    />
      <Count title='Home Town'      count={account.home_town}                                     />
      <Count title='Albums'         count={account.counters.albums}                               />
      <Count title='Audios'         count={account.counters.audios}                               />
      <Count title='Photos'         count={account.counters.photos}                               />
      <Count title='Subscriptions'  count={account.counters.subscriptions}                        />
      <Count title='Videos'         count={account.counters.videos}                               />
      <Count title='Topics'         count={account.counters.topics}                               />
      <Count title='Articles'       count={account.counters.articles}                             />
      <Count title='Narratives'     count={account.counters.narratives}                           />
      <Count title='Clips'          count={account.counters.clips}                                />
      <Count title='Addresses'      count={account.counters.addresses}                            />
      <Count title='Status'         count={useSplitText(account.status)}                          />
      <Count title='Description'    count={useSplitText(account.description)}                     />
    </div>
  );
};

export default Body;
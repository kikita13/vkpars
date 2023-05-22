import React, { useState } from 'react';
import styles from '@/styles/users/index.module.css'
import Menu from './menu/menu';
import Users from './users';
import { useDispatch } from 'react-redux';
import { fetchFriends } from '@redux/slices/friends';


const Index = () => {
  const [id, setId] = useState("");
  const [city, setCity] = useState(undefined);
  const [ageOver, setAgeOver] = useState(undefined);
  const [firstName, setFirstName] = useState(undefined);
  const [lastName, setLastName] = useState(undefined);
  const [ageLess, setAgeLess] = useState(undefined);
  const dispatch = useDispatch()
  const handleClick = (props) => {
    const {id} = props
    id > 0
    ? dispatch(fetchFriends(id))
    : dispatch()
  }
  return (
    <div className={styles.container}>
      <Menu
        setId={setId}
        setCity={setCity}
        setAgeOver={setAgeOver}
        setAgeLess={setAgeLess}
        setFirstName={setFirstName}
        setLastName={setLastName}
        handleClick={handleClick}
        id={id}
      />
      <Users
        firstName={firstName}
        lastName={lastName}
        ageOver={ageOver}
        ageLess={ageLess}
        city={city}
      />
    </div>
  );
};

export default Index;
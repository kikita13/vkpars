import styles from "@/styles/posts/menu/menu.module.css";
import Button from "@components/posts/menu/button";
import Input from "@components/posts/menu/input";

const Menu = (props) => {
  const {
    setAgeOver,
    setAgeLess,
    setId,
    setCity,
    id,
    setFirstName,
    setLastName,
    handleClick,
    setSex,
  } = props;

  return (
    <div className={styles.container}>
      <Input text="id user or club" setValue={setId} />
      
      <Input text="sex" setValue={setSex} />
      
      <Input text="first name" setValue={setFirstName} />
      
      <Input text="last name" setValue={setLastName} />
      
      <Input text="city" setValue={setCity} />
      
      <Input text="age over" setValue={setAgeOver} />
      
      <Input text="age less" setValue={setAgeLess} />
      
      <Button handleClick={handleClick} id={id} />
    </div>
  );
};

export default Menu;

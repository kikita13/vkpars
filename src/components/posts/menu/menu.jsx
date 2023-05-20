import React from "react";
import Input from "./input";
import Button from "./button";
import styles from "@/styles/posts/menu/menu.module.css";

const Menu = (props) => {
  const { 
    setId,
    setCity, 
    setKeyword, 
    setMaxPosts, 
    handleClick,
    id,
    maxPosts
  } = props;
  return (
    <div className={styles.container}>
      <Input
        setValue={setId} text="id user or club" />
      <Input
        setValue={setMaxPosts} text="max posts count" />
      <Input
        setValue={setCity} text="city" />
      <Input
        setValue={setKeyword} text="keyword" />
      <Button 
        handleClick={handleClick}
        id={id}  
        maxPosts={maxPosts}
      />
    </div>
  );
};

export default Menu;

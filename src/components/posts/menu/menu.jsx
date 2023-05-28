import React from "react";
import Input from "./input";
import Button from "./button";
import styles from "@/styles/posts/menu/menu.module.css";

const Menu = (props) => {

  const { 
    setAgeOver,
    setAgeLess,
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
        setValue={setId} 
        text="id user or club" />
      <Input
        setValue={setMaxPosts} 
        text="max posts count" />
      <Input
        setValue={setCity} 
        text="city" />
      <Input
        setValue={setKeyword} 
        text="keyword" />
      <Input
        setValue={setAgeOver} 
        text="over age" /> 
      <Input
        setValue={setAgeLess} 
        text="less than age" />
      <Button 
        handleClick={handleClick}
        id={id}  
        maxPosts={maxPosts} />
    </div>
  );
};

export default Menu;

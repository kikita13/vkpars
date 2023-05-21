import React, { useState } from "react";
import Menu from "./menu/menu";
import Posts from "./posts/posts";
import styles from "@/styles/posts/index.module.css";
import { useDispatch } from "react-redux";
import { fetchPosts } from "@redux/slices/posts";

const Index = () => {
  const [id, setId] = useState("");
  const [maxPosts, setMaxPosts] = useState("100");
  const [city, setCity] = useState(undefined);
  const [keyword, setKeyword] = useState(undefined);
  const [ageOver, setAgeOver] = useState(undefined);
  const [ageLess, setAgeLess] = useState(undefined);
  const dispatch = useDispatch()
  const handleClick = (props) => dispatch(fetchPosts(props))

  return (
    <div className={styles.container}>
      <Menu
        setId={setId}
        setCity={setCity}
        setMaxPosts={setMaxPosts}
        setKeyword={setKeyword}
        handleClick={handleClick}
        setAgeOver={setAgeOver}
        setAgeLess={setAgeLess}
        id={id}
        maxPosts={maxPosts}
        />
      <Posts 
        ageOver={ageOver}
        ageLess={ageLess}
        city={city}
        keyword={keyword}
      />
    </div>
  );
};

export default Index;

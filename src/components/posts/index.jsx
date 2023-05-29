import React, { useState } from "react";
import Menu from "./menu/menu";
import Posts from "./posts/posts";
import styles from "@/styles/posts/index.module.css";
import { useDispatch } from "react-redux";
import { fetchPosts } from "@redux/slices/posts";
import { fetchComments } from "@redux/slices/comments";

const Index = (props) => {

  const {comments} = props
  
  const [id, setId] = useState("");
  const [maxPosts, setMaxPosts] = useState("100");
  const [keyword, setKeyword] = useState(undefined);
  const [city, setCity] = useState(undefined);
  const [ageOver, setAgeOver] = useState(undefined);
  const [ageLess, setAgeLess] = useState(undefined);
  const dispatch = useDispatch()
  const handleClick = (props) => dispatch(fetchPosts(props))

  return (
    <div className={styles.container}>
      <Menu
        setId={setId}
        setCity={setCity}
        setAgeOver={setAgeOver}
        setAgeLess={setAgeLess}
        handleClick={handleClick}
        id={id}
        setMaxPosts={setMaxPosts}
        setKeyword={setKeyword}
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

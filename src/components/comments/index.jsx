import Menu from "@components/posts/menu/menu";
import { fetchComments } from "@redux/slices/comments/comments";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from '@/styles/comments/index.module.css'
import Comments from "./comments";

const Index = () => {
  const [id, setId] = useState("");
  const [maxPosts, setMaxPosts] = useState("100");
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState(undefined);
  const [ageOver, setAgeOver] = useState(undefined);
  const [ageLess, setAgeLess] = useState(undefined);
  const dispatch = useDispatch();
  const handleClick = (props) => dispatch(fetchComments(props));
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
        keyword={keyword}
        city={city}
        ageOver={ageOver}
        ageLess={ageLess}
      />
      <Comments 
        keyword={keyword}
        city={city}
        ageOver={ageOver}
        ageLess={ageLess}
      />
    </div>
  );
};

export default Index;

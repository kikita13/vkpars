import { useState } from "react";
import Menu from "./menu/menu";
import Posts from "./posts";
import styles from "@/styles/posts/index.module.css";
import { useDispatch } from "react-redux";
import { fetchPosts } from "@redux/slices/posts";

const Index = () => {
  const [id, setId] = useState("");
  const [maxPosts, setMaxPosts] = useState("100");
  const [keyword, setKeyword] = useState(undefined);
  const [city, setCity] = useState(undefined);
  const [ageOver, setAgeOver] = useState(undefined);
  const [ageLess, setAgeLess] = useState(undefined);
  const [firstName, setFirstName] = useState(undefined);
  const [lastName, setLastName] = useState(undefined);

  const dispatch = useDispatch();

  const handleClick = (props) => dispatch(fetchPosts(props));

  return (
    <div className={styles.container}>
      <Menu
        keyword={keyword}
        city={city}
        ageLess={ageLess}
        ageOver={ageOver}
        firstName={firstName}
        lastName={lastName}
        setLastName={setLastName}
        setFirstName={setFirstName}
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
      
      <Posts />
    </div>
  );
};

export default Index;

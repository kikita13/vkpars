import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { postsReducer } from "./slices/posts";


export const store = configureStore({
    reducer: {
      posts: postsReducer
    }
});

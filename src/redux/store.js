import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { friendsReducer } from "./slices/friends";


export const store = configureStore({
    reducer: {
      posts: postsReducer,
      friends: friendsReducer,
    }
});

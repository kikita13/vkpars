import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { friendsReducer } from "./slices/friends";
import { membersReducer } from "./slices/members";


export const store = configureStore({
    reducer: {
      posts: postsReducer,
      friends: friendsReducer,
      members: membersReducer
    }
});

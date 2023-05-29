import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { friendsReducer } from "./slices/friends";
import { membersReducer } from "./slices/members";
import { commentReducer } from "./slices/comment";

export const store = configureStore({
    reducer: {
      posts: postsReducer,
      friends: friendsReducer,
      members: membersReducer,
      comment: commentReducer
    }
});

import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { friendsReducer } from "./slices/friends/friends";
import { membersReducer } from "./slices/members";
import { commentReducer } from "./slices/comment";
import { commentsReducer } from "./slices/comments/comments";

export const store = configureStore({
    reducer: {
      posts: postsReducer,
      friends: friendsReducer,
      members: membersReducer,
      comment: commentReducer,
      comments: commentsReducer
    }
});

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { responsePosts } from "./helpers/requestsDelay.helper";
import { postMapper } from "./helpers/postMapper.helper";
import { commentsRequests } from "./helpers/commentsReqSlicer.helper";
import { responseComments } from "./helpers/requestComments";
import { commentsMapper } from "./helpers/commentsMapper.helper";
import { threadRequests } from "./helpers/threadsReqSlicer.helper";
import { threadsMapper } from "./helpers/threadsMapper.helper";
import { responseThreads } from "./helpers/requestThreads";

export const fetchComments = createAsyncThunk("comments/fetchComments",async (props) => {

  const {id, maxPosts } = props  
  
  const arrayOfPosts = await responsePosts({id,maxPosts})
  const posts = postMapper(arrayOfPosts)

  const countsComms = [];
  posts.haveComments.forEach(post => {countsComms.push({count:post.comments.count, post_id: post.id, owner_id: post.owner_id})})

  const codesForComments = commentsRequests(countsComms)
  const arrayOfComments = await responseComments(codesForComments);

  const comments = commentsMapper(arrayOfComments)

  posts.posts.map(post => {
    post.comments.items = [];
    post.comments.items.push(...comments.comments.filter(comment => comment.post_id == post.id))
  })
  
  const countThreads = []
  comments.haveThreads.map(item => item.from_id !== 0 ? countThreads.push({count:item.thread.count, post_id: item.post_id, owner_id: item.owner_id, comment_id: item.id}) : true)
  const codesForThreads = threadRequests(countThreads)
  const arrayOfThreads = await responseThreads(codesForThreads)
  const threads = threadsMapper(arrayOfThreads.flat().flat())
  posts.posts.map(post => post.comments.items.map(comment => {
    comment.thread.items = []
    comment.thread.items.push(...threads.filter(thread => thread.parents_stack == comment.id))
  }))
  return {count: posts.count,posts:posts.posts, account: posts.account};
});

const initialState = {
  comments: [],
  status: "",
  error: "",
};

const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.comments = [];
      state.status = "pending";
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.comments = action.payload;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
}); 

export const {} = comments.actions;

export const commentsReducer = comments.reducer;






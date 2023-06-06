import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {VkApiHelper, DelayHelper, ResultMapperHelper} from "./helpers";
import {REQUEST_PER_SECOND, VK_EXECUTE_CHUNK_SIZE, VK_GET_COUNT} from "./consts";
import { postMapper } from "./comments/helpers/postMapper.helper";
import { responsePosts } from "./comments/helpers/requestsDelay.helper";

const updatePosts = createAction('updatePosts')

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (props, thunkAPI) => {
  const { id, maxPosts } = props;
  const arrayOfPosts = await responsePosts({id,maxPosts})
  const posts = postMapper(arrayOfPosts)

  return {posts: posts.posts, account: posts.account, count: posts.count};
});

const initialState = {
  posts: [],
  status: "",
  error: "",
};


const posts = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "pending";
      state.posts = [];
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.posts = action.payload
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      state.posts = [];
    });
  },
});

export const {} = posts.actions;

export const postsReducer = posts.reducer;

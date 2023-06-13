import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { postMapper } from "./comments/helpers/postMapper.helper";
import { responsePosts } from "./comments/helpers/requestsDelay.helper";
import { useListSplit } from "@consts/hooks/litsSplitter";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (props) => {

  const { id, maxPosts, keyword, city, ageOver, ageLess } = props;

  const keywords = useListSplit(keyword)
  const cities = useListSplit(city)


  const arrayOfPosts = await responsePosts({id,maxPosts})
  const posts = postMapper(arrayOfPosts)
  console.log(posts);
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


export const postsReducer = posts.reducer;

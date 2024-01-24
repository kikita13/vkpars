import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postMapper } from "./comments/helpers/postMapper.helper";
import { responsePosts } from "./comments/helpers/requestsDelay.helper";
import { useListSplit } from "@consts/hooks/litsSplitter";
import { commentsFilter } from "./comments/helpers/commentsFilter.helper";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (props) => {
    const {
      id,
      maxPosts,
      keyword,
      city,
      ageOver,
      ageLess,
      firstName,
      lastName,
    } = props;

    const keywords = useListSplit(keyword);
    const cities = useListSplit(city);
    const firstNames = useListSplit(firstName);
    const lastNames = useListSplit(lastName);
    let arrayOfPosts = null;

    arrayOfPosts = await responsePosts({ id, maxPosts });
    const posts = postMapper(arrayOfPosts);

    const filteredPosts = commentsFilter(
      posts.posts,
      keywords,
      ageLess,
      ageOver,
      cities,
      firstNames,
      lastNames
    );

    return { posts: filteredPosts, account: posts.account, count: posts.count };
  }
);

const initialState = {
  posts: [],
  status: "waiting",
  error: "",
};

const posts = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "fulfilled";

      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "error";

      state.error = action.error;
      
      state.posts = [];
    });
  },
});

export const postsReducer = posts.reducer;

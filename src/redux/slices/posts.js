import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
  }
);

const initialState = {
  posts: [],
  status: '',
  error: ''
};

const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = 'pending'
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      state.posts = action.payload
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'error'
      state.error = action.error.message
    });
  },
});

export const { } = posts.actions;

export const postsReducer = posts.reducer;

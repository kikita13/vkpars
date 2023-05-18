import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getposts = createAsyncThunk(
  "posts/getposts",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
  }
);

const initialState = {
  
};

const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getposts.pending, (state, actoin) => {
      
    });
    builder.addCase(getposts.fulfilled, (state, actoin) => {
      
    });
    builder.addCase(getposts.rejected, (state, actoin) => {
      
    });
  },
});

export const { nameAction} = posts.actions;

export const postsReducer = posts.reducer;

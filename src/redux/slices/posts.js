import { FIELDS } from "@consts/fields";
import { TOKEN } from "@consts/token";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $ from "jquery";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return new Promise((resolve, reject) => {
    const code = `var posts = API.wall.get({"owner_id": 1, "count": 100, "extended":'1', "fields":'${FIELDS.user}'}); return posts;`;
    $.ajax({
      url: `https://api.vk.com/method/execute?`,
      data: {
        code,
        access_token: TOKEN,
        v: '5.131'
      },
      dataType: "jsonp",
      method: "GET",
      success: (data) => {
        resolve(data.response);
          const response = data.response
          const allPosts = response.count
          const profiles = response.profiles
          const items = response.items
          const groups = response.groups
      },
      error: (error) => {
        reject(new Error(error.message));
      }
    });
  });
});

const initialState = {
  posts: [],
  status: "",
  error: ""
};

const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {},
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
      state.error = action.error.message;
    });
  }
});

export const {} = posts.actions;

export const postsReducer = posts.reducer;

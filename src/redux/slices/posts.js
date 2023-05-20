import { FIELDS } from "@consts/fields";
import { TOKEN } from "@consts/token";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $ from "jquery";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (props) => {
  const {id, maxPosts} = props
  return new Promise((resolve, reject) => {
    const code = `
      var offset = 0;
      var count = '${maxPosts}';
      var allPosts;
      var profiles = [];
      var items = [];
      var groups = [];
      while (offset < count) {
        var response = API.wall.get({
          "owner_id": '${id}',
          "count": 100,
          "offset": offset,
          "extended": '1',
          "fields": '${FIELDS.user}'
        });
        
        items = items + response.items;
        profiles = profiles + response.profiles;
        groups = groups + response.groups;
        allPosts = response.count;
        offset = offset + 100;
      }
      
      return {
        count: allPosts,
        items: items,
        profiles: profiles,
        groups: groups
      };
    `;

    $.ajax({
      url: "https://api.vk.com/method/execute?",
      data: {
        code,
        access_token: TOKEN,
        v: "5.131",
      },
      dataType: "jsonp",
      method: "GET",
      success: (data) => {
        resolve(data.response);
      },
      error: (error) => {
        reject(new Error(error.message));
      },
    });
  });
});


const initialState = {
  posts: [],
  status: "",
  error: "",
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
  },
});

export const {} = posts.actions;

export const postsReducer = posts.reducer;

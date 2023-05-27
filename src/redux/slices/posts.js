import { FIELDS } from "@consts/fields";
import { TOKEN } from "@consts/token";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $ from "jquery";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (props) => {
  const { id, maxPosts } = props;
  const number = maxPosts;
  const interval = 100;
  const chunkSize = 10;
  const result = [];
  const code = [];

  for (let i = 0; i < number; i += chunkSize * interval) {
    const chunk = [];
    for (let j = i; j < i + chunkSize * interval && j <= number; j += interval) {
      chunk.push(
        `var response = API.wall.get({"owner_id": '${id}',"count": 100,"offset": ${j},"extended": '1',"fields": '${FIELDS.user}'}); items = items + response.items; profiles = profiles + response.profiles; groups = groups + response.groups;`
      );
    }
    result.push(chunk);
  }

  for (let i = 0; i < result.length; i++) {
    code.push(result[i]);
  }

  const qwe = [];

  const executeRequests = code.map((chunk,index) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        $.ajax({
          url: "https://api.vk.com/method/execute?",
          data: {
            code: `var allPosts;var profiles = [];var items = [];var groups = []; ${chunk.join('')} return { count: response.count, items: items, profiles: profiles, groups: groups };`,
            access_token: TOKEN,
            v: "5.131",
          },
          dataType: "jsonp",
          method: "GET",
          success: (data) => {
            resolve(data.response);
          },
          error: (error) => {
            console.log(error);
          },
        });
      }, index*1000/3)
    });
  });

  try {
    const responses = await Promise.all(executeRequests);
    qwe.push(...responses);
  } catch (error) {
    throw new Error(error.message);
  }

  const mergedObject = qwe.reduce(
    (merged, current) => {
      merged.count = current.count;
      merged.profiles.push(...current.profiles);
      merged.items.push(...current.items);
      merged.groups.push(...current.groups);
      return merged;
    },
    { count: 0, profiles: [], items: [], groups: [] }
  );
  return mergedObject;
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

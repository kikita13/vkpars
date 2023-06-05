import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {VkApiHelper, DelayHelper, ResultMapperHelper} from "./helpers";
import {REQUEST_PER_SECOND, VK_EXECUTE_CHUNK_SIZE, VK_GET_COUNT} from "./consts";

const updatePosts = createAction('updatePosts')

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (props, thunkAPI) => {
  const { id, maxPosts } = props;
  const codeChunks = [];

  for (let offset = 0; offset < maxPosts; offset += VK_GET_COUNT) {
    const chunkIndex = Math.floor(offset / (
      VK_GET_COUNT * VK_EXECUTE_CHUNK_SIZE
    ));
    const newCode = VkApiHelper.getApiWallCode(id, offset, maxPosts);

    codeChunks[chunkIndex] = `${codeChunks[chunkIndex] ?? ''}${newCode}`;
  }

  const result = [];

  try {
    for (const codeChunk of codeChunks) {
      const startTimestamp = (new Date()).getDate();
      const response = await VkApiHelper.executeChunk(codeChunk, id);
      const endTimestamp = (new Date()).getDate();

      result.push(response);

      thunkAPI.dispatch(updatePosts(ResultMapperHelper.mapResult(result)));

      // Тут можно еще добавить немного милисекунд, чтобы наверняка не было больше секунды, хз
      const timeToWait = 1000 / REQUEST_PER_SECOND - (endTimestamp - startTimestamp);

      if (timeToWait > 0) {
        await DelayHelper.delay(timeToWait);
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }

  return null;
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
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      state.posts = [];
    });
    builder.addCase(updatePosts, (state, action) => {
      state.status = "fulfilled";
      state.posts = action.payload;
    });
  },
});

export const {} = posts.actions;

export const postsReducer = posts.reducer;

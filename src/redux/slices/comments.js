import { TOKEN } from "@consts/token";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $ from 'jquery'

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (props) => {
    const { id, maxPosts } = props;
    const number = maxPosts;
    const interval = 100;
    const chunkSize = 10;
    const result = [];
    const code = [];

    for (let i = 0; i < number; i += chunkSize * interval) {
      const chunk = [];
      for (
        let j = i;
        j < i + chunkSize * interval && j <= number;
        j += interval
      ) {
        chunk.push(
          `var response = API.wall.get({"count":${interval},"owner_id":'${id}', "offset":'${j}'}).items@.id; ids = ids + response;`
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
              code: `var ids = [];${chunk.join(';')}; return ids;`,
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
        }, index*1000/3+50)
      });
    });

    try {
      const responses = await Promise.all(executeRequests);
      qwe.push(...responses)
    } catch (error) {
      throw new Error(error.message)
    }
    const flatedIds = [...qwe.flat()];
    const groupedIds = [];
    // for (let i = 0; i < number; i += chunkSize * interval) {
    //   const chunk = [];
    //   for (
    //     let j = i;
    //     j < i + chunkSize * interval && j <= number;
    //     j += interval
    //   ) {
    //     chunk.push(flatedIds[j]);
    //   }
    //   result.push(chunk);
    // }
    return groupedIds;
  }
);

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

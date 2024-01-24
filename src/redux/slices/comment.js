import { useCodeComment } from "@consts/hooks/slicedCode";
import { TOKEN } from "@consts/token";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $ from "jquery";

export const fetchComment = createAsyncThunk(
  "comment/fetchComment",
  async (props) => {
    const { owner_id, post_id } = props;
    const interval = 100;
    const chunkSize = 10;
    let codeComm;
    await $.ajax({
      url: "https://api.vk.com/method/execute?",
      data: {
        code: `var count_comments = API.wall.getComments({"owner_id": '${owner_id}', "post_id": '${post_id}'}).current_level_count; return count_comments;`,
        access_token: TOKEN,
        v: "5.131",
      },
      dataType: "jsonp",
      success: (data) => {
        const number = data.response;
        codeComm = useCodeComment({
          number,
          interval,
          chunkSize,
          owner_id,
          post_id,
        });
      },
    });

    const comments = await $.ajax({
      url: "https://api.vk.com/method/execute?",
      data: {
        code: `var allComments = []; ${codeComm
          .flat()
          .join("")}; return allComments;`,
        access_token: TOKEN,
        v: "5.131",
      },
      dataType: "jsonp",
      method: "GET",
    });
    const mergedObject = comments.response.reduce(
      (merged, current) => {
        merged.count = current.count;
        merged.profiles.push(...current.profiles);
        merged.items.push(...current.items);
        merged.groups.push(...current.groups);
        return merged;
      },
      { count: 0, profiles: [], items: [], groups: [], post_id: post_id }
    );
    return mergedObject;
  }
);

const initialState = {
  comment: [],
  status: "",
  error: "",
};

const comment = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComment.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchComment.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.comment = [...state.comment, action.payload];
    });
    builder.addCase(fetchComment.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export const {} = comment.actions;

export const commentReducer = comment.reducer;

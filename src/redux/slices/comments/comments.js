import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { responsePosts } from "./helpers/requestsDelay.helper";
import { postMapper } from "./helpers/postMapper.helper";
import { commentsRequests } from "./helpers/commentsReqSlicer.helper";
import { responseComments } from "./helpers/requestComments";
import { commentsMapper } from "./helpers/commentsMapper.helper";
import { threadRequests } from "./helpers/threadsReqSlicer.helper";
import { threadsMapper } from "./helpers/threadsMapper.helper";
import { responseThreads } from "./helpers/requestThreads";
import { commentsFilter } from "./helpers/commentsFilter.helper";
import { useListSplit } from "@consts/hooks/litsSplitter";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
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
    console.log(
      id,
      maxPosts,
      keyword,
      city,
      ageOver,
      ageLess,
      firstName,
      lastName
    );
    const keywords = useListSplit(keyword);
    const cities = useListSplit(city);
    const firstNames = useListSplit(firstName);
    const lastNames = useListSplit(lastName);
    const arrayOfPosts = await responsePosts({ id, maxPosts });
    const posts = postMapper(arrayOfPosts);
    const countsComms = [];

    posts.haveComments.forEach((post) => {
      countsComms.push({
        count: post.comments.count,
        post_id: post.id,
        owner_id: post.owner_id,
      });
    });

    const codesForComments = commentsRequests(countsComms);
    const arrayOfComments = await responseComments(codesForComments);

    const comments = commentsMapper(arrayOfComments);

    const comms = commentsFilter(
      comments.comments,
      keywords,
      ageLess,
      ageOver,
      cities,
      firstNames,
      lastNames
    );

    posts.posts.map((post) => {
      post.comments.items = [];
      post.comments.items.push(
        ...comms.filter((comment) => comment.post_id == post.id)
      );
    });

    const countThreads = [];

    comments.haveThreads.map((item) =>
      item.from_id !== 0
        ? countThreads.push({
            count: item.thread.count,
            post_id: item.post_id,
            owner_id: item.owner_id,
            comment_id: item.id,
          })
        : true
    );

    const codesForThreads = threadRequests(countThreads);
    const arrayOfThreads = await responseThreads(codesForThreads);
    const threads = threadsMapper(arrayOfThreads.flat().flat());

    const thrs = commentsFilter(
      threads,
      keywords,
      ageLess,
      ageOver,
      cities,
      firstNames,
      lastNames
    );

    posts.posts.map((post) =>
      post.comments.items.push(
        ...thrs.filter((thread) => thread.post_id == post.id)
      )
    );

    return { count: posts.count, posts: posts.posts, account: posts.account };
  }
);

const initialState = {
  posts: [],
  status: "waiting",
  error: "",
};

const comments = createSlice({
  name: "comments",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.posts = [];

      state.status = "pending";
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.status = "fulfilled";

      state.posts = action.payload;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.status = "error " + action.error.message;

      state.error = action.error.message;
    });
  },
});

export const commentsReducer = comments.reducer;

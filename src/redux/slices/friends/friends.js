import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { friendsInitRequest } from "./helpers/friendsInitRequest";
import { friendsRequests } from "./helpers/friendsRequests.helper";
import { responseFriends } from "./helpers/friendsRequests";
import { friendsMapper } from "./helpers/friendsMapper.helper";
import { usersFilter } from "./helpers/friendsFilter.helper";
import { useListSplit } from "@consts/hooks/litsSplitter";

export const fetchFriends = createAsyncThunk(
  "friends/fetchFriends",
  async (props) => {
    const { id, city, ageOver, ageLess, firstName, lastName, sex } = props;

    const cities = useListSplit(city);
    const last_names = useListSplit(lastName);
    const first_names = useListSplit(firstName);

    const { account, countPosts } = await friendsInitRequest(id);
    account.counters.posts = countPosts;

    const codes = friendsRequests(
      id > 0 ? account.counters.friends : account.members_count,
      id
    );

    const arrayOfFriends = await responseFriends(codes);

    const users = friendsMapper(arrayOfFriends);

    const filteredUsers = usersFilter(
      users,
      cities,
      ageOver,
      ageLess,
      first_names,
      last_names,
      sex
    );

    return { account, users: filteredUsers };
  }
);

const initialState = {
  users: [],
  status: "waiting",
  error: "",
};

const friends = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFriends.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchFriends.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.users = action.payload;
    });
    builder.addCase(fetchFriends.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export const {} = friends.actions;

export const friendsReducer = friends.reducer;

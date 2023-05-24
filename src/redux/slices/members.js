import { FIELDS } from "@consts/fields";
import { TOKEN } from "@consts/token";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $ from 'jquery'

export const fetchMembers = createAsyncThunk("members/fetchMembers", async (props) => {
  return new Promise((resolve, reject) => {
    const code = `
      
      var length = API.groups.getMembers({
        "group_id": '${props}',
        "count": 1
      }).count;

      var offset = 0;
      var count = 950;
      var items = [];
      while(offset <= length ) {
      var members = API.groups.getMembers({
        "group_id": '${props}',
        "count" : count,
        "offset": offset,
        "fields": '${FIELDS.friends}'
      });
      offset = offset + count;
      items = items + members.items;
      };

      return {items: items, count: length};
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
     }) });
  });

const initialState = {
  members: [],
  status: '',
  error: ''
};

const members = createSlice({
  name: "members",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMembers.pending, (state) => {
      state.status = 'pending'
    });
    builder.addCase(fetchMembers.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      state.members = action.payload
    });
    builder.addCase(fetchMembers.rejected, (state, action) => {
      state.status = 'error'
      state.error = action.error.message
    });
  },
});

export const { } = members.actions;

export const membersReducer = members.reducer;





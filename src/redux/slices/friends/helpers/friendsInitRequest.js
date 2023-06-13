import { FIELDS } from "@consts/fields";
import { TOKEN } from "@consts/token";
import $ from "jquery";

export const friendsInitRequest = async (props) => {
  const result = await $.ajax({
    url: "https://api.vk.com/method/execute?",
    data: {
      code: `var acc = API.users.get({"user_ids": '${props}', "fields": '${FIELDS.user}'}); 
             var posts = API.wall.get({"owner_id": '${props}', "count":1}).count;              
             return {account: acc[0], countPosts: posts};`,
      access_token: TOKEN,
      v: "5.131",
    },
    dataType: "jsonp",
    method: "GET",
    success: (data) => data.response,
    error: (error) => new Error(error.msg),
  });
  return result.response
};

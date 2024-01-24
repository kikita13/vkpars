import $ from "jquery";
import { FIELDS } from "@consts/fields";
import { TOKEN } from "@consts/token";
import { VK_GET_COUNT } from "@redux/slices/consts";

export class VkApiHelper {
  static executeChunk(code, id) {
    return new Promise((resolve, reject) =>
      $.ajax({
        url: "https://api.vk.com/method/execute?",
        data: {
          code: `
            var account;
            if (${id} < 0) {
              account = API.groups.getById({"group_id": '${-id}', "fields": '${FIELDS.group}'});
            } else {
              account = API.users.get({"user_ids": '${id}', "fields": '${FIELDS.user}'});
              };
            var profiles = [];
            var items = [];
            var groups = [];
            ${code}
            return { count: response.count, items: items, profiles: profiles, groups: groups, account: account };`,
          access_token: TOKEN,
          v: "5.131",
        },
        dataType: "jsonp",
        method: "GET",
        success: (data) => {
          console.log(data);

          return resolve(data.response);
        },
        error: (err) => {
          console.log("err", err);

          return reject(err);
        },
      })
    );
  }

  static getApiWallCode(id, offset, maxCount) {
    return `
      var response = API.wall.get({"owner_id": '${id}', "count": ${Math.min(maxCount - offset,VK_GET_COUNT)},"offset": ${offset},"extended": '1',"fields": '${FIELDS.user}'});
      items = items + response.items;
      profiles = profiles + response.profiles;
      groups = groups + response.groups;`;
  }
}

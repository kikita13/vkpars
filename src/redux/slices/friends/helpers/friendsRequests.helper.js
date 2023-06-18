import { FIELDS } from "@consts/fields";
import { useCodeFriends } from "./friendsCodeSlicer.helper";
import { friendsRequestsSlicer } from "./friendsRequestsSlicer.helper";

export const friendsRequests = (count, id) => {
  let codesForFriends = [];
    if(id > 0) {
      if (count < 5000) {
        codesForFriends.push(`var items = API.friends.get({"user_id": '${id}',"count":'${count}',"extended": 1,"fields": '${FIELDS.friends}'}); allFriends.push(items);`);
      } else if (count > 5000) {
        codesForFriends.push(useCodeFriends(count, id,`var items = API.friends.get({"user_id": '|',"count":'|',"extended": 1,"offset":'|',"fields": '|'}); allFriends.push(items);`));
      }
    } else if (id < 0) {
      if (count < 1000) {
        codesForFriends.push(`var items = API.groups.getMembers({"group_id": '${Math.abs(id)}',"count":'${count}',"extended": 1,"fields": '${FIELDS.friends}'}); allFriends.push(items);`);
      } else if (count > 1000) {
        codesForFriends.push(useCodeFriends(count, id,`var items = API.groups.getMembers({"group_id": '|',"count":'|',"extended": 1,"offset":'|',"fields": '|'}); allFriends.push(items);`));
      }
    }
  codesForFriends = codesForFriends.flat().flat();
  const requestsForComments = friendsRequestsSlicer(codesForFriends);
  return requestsForComments
}
import { blockedUser } from "./consts/blockedUser";

export const threadsMapper = (props) => {
  let items = [];
  let groups = [];
  let profiles = [];

  props.map((item) => {
      items = [...items, ...item.items];
      groups = [...groups, ...item.groups];
      profiles = [...profiles, ...item.profiles];
  });

  items.map((comment) => {
    comment.user =
      comment.from_id > 0
        ? profiles.find((user) => user.id == comment.from_id) || blockedUser
        : groups.find((group) => group.id == Math.abs(comment.from_id)) ||
          blockedUser;
    comment.group =
      comment.owner_id > 0
        ? profiles.find((user) => user.id == comment.owner_id) || blockedUser
        : groups.find((group) => group.id == Math.abs(comment.owner_id)) ||
          blockedUser;
  });
  
  return items;
};

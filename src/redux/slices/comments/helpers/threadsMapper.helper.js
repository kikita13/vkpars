import { blockedUser } from "./consts/blockedUser";

export const threadsMapper = (props) => {
  const items = [];
  const groups = [];
  const profiles = [];

  props.map((item) => {
    if (item !== undefined) {
      items.push(...item?.items);
      groups.push(...item?.groups);
      profiles.push(...item?.profiles);
    }
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

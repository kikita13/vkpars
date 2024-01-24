import { blockedUser } from "./consts/blockedUser";

export const commentsMapper = (props) => {
  const comms = props.flat().flat();
  
  let items = [];
  let groups = [];
  let profiles = [];
  
  comms.forEach((item) => {
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

  const haveThreads = items.filter((comm) => comm.thread.count > 0);
  
  return { comments: items, haveThreads };
};

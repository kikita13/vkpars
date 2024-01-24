export const postMapper = (props) => {
  const items = [];
  const groups = [];
  const profiles = [];
  const account = [];

  let count;

  props.map((item) => {
    items.push(...item.items);
    groups.push(...item.groups);
    profiles.push(...item.profiles);
    account.push(...item.account);
    count = item.count;
  });

  items.map((post) => {
    post.user =
      post.from_id > 0
        ? profiles.find((user) => user.id == post.from_id) || blockedUser
        : groups.find((group) => group.id == Math.abs(post.from_id)) ||
          blockedUser;
    post.group =
      post.owner_id > 0
        ? profiles.find((user) => user.id == post.owner_id) || blockedUser
        : groups.find((group) => group.id == Math.abs(post.owner_id)) ||
          blockedUser;
    if (post.copy_history) {
      post.copy_history.map((rep) => {
        rep.from_id > 0
          ? (rep.user = profiles.find((user) => user.id == rep.from_id))
          : (rep.user = groups.find(
              (group) => group.id == Math.abs(rep.from_id)
            ));
      });
    }
  });

  const haveComments = items.filter((post) => post.comments.count > 0);
  
  return { posts: items, haveComments, account: { ...account }, count };
};

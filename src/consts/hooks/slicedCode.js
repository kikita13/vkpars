import { FIELDS } from "../fields";

export const useCodeComment = (props) => {
  const {number, interval, chunkSize, owner_id, post_id} = props
  const result = [];
  const codeRes = [];
  for (let i = 0; i < number; i += chunkSize * interval) {
    const chunk = [];
    for (let j = i; j < i + chunkSize * interval && j <= number; j += interval) {
      chunk.push(`var comments = API.wall.getComments({"owner_id": '${owner_id}',"offset": ${j}, "post_id": '${post_id}', "count": 100,"extended":1, "fields": '${FIELDS.user}'}); allComments.push(comments);`
      );
    }
    result.push(chunk);
  }
  for (let i = 0; i < result.length; i++) {
    codeRes.push(result[i]);
  }
  return codeRes;
}

export const useCodeComments = (props) => {
  const {number, interval, chunkSize, owner_id} = props
  const result = [];
  const codeRes = [];
  for (let i = 0; i < number; i += chunkSize * interval) {
    const chunk = [];
    for (let j = i; j < i + chunkSize * interval && j <= number; j += interval) {
      chunk.push(  `var posts = API.wall.get({"count":${interval},"owner_id":'${owner_id}', "offset":'${j}',"extended":1, "fields": '${FIELDS.user}'});
      var i = 0;
      var ids;
      while(i <= posts.length){
        if(posts[i].items.thread.count > 0){ids = ids + posts[i].id};
        i = i + 1;
      } 
      return ids;`);
    }
    result.push(chunk);
  }
  for (let i = 0; i < result.length; i++) {
    codeRes.push(result[i]);
  }
  return codeRes;

}


// var i = 0; 
// var haveComments = []; 
// var posts = API.wall.get({"owner_id":-108736036,"count": 100, "offset":0,"extended":1});
// while(i < posts.items.length)
// {
//   if(posts.items[i].comments.count > 0)
//   {haveComments.push({post_id: posts.items[i].id, owner_id: posts.items[i].owner_id });};
//   i = i + 1;
// };
// var j = 0;
// var c = 0;
// var allComments = [];
// var haveThread = [];
// while(j < 24){
//   var comments = API.wall.getComments({"owner_id":haveComments[j].owner_id,"count": 100, "offset":0,"extended":1, "post_id": haveComments[j].post_id});
//   allComments.push(comments);
//   while(c < comments.items.length) {
//     if (comments.items[c].thread.count > 0){
//       haveThread.push({comment_id: comments.items[c].id, post_id: haveComments[j].post_id, owner_id: haveComments[j].owner_id});
//     };
//   c = c + 1;};
//   j = j + 1;
// };
// return {posts: posts, haveComments: haveComments, allComments: allComments, haveThread: haveThread};
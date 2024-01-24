import { FIELDS } from "@consts/fields";
import { useCodeComments } from "@consts/hooks/slicedCode";

export const commentRequestsSlicer = (comms) => {
  const max = comms.length;
  const result = [];
  const chunkSize = 24;
  const interval = 100;
  let i = 0;
  while (i < max) {
    result.push(comms.slice(i, i + chunkSize));
    i += chunkSize || max % chunkSize;
  }
  return result;
};

export const commentsRequests = (countsComms) => {
  let codesForComments = [];
  for (let i in countsComms) {
    if (countsComms[i].count < 100) {
      codesForComments.push(
        `var comments = API.wall.getComments({"owner_id":'${countsComms[i].owner_id}',"post_id": '${countsComms[i].post_id}',"count":'${countsComms[i].count}', "extended": 1, "fields": '${FIELDS.user}'}); allComments.push(comments);`
      );
    } else if (countsComms[i].count > 100) {
      codesForComments.push(
        useCodeComments(
          countsComms[i].count,
          countsComms[i].owner_id,
          countsComms[i].post_id,
          `var comments = API.wall.getComments({"owner_id":'|',"post_id": '|',"count":'|',"offset":'|', "extended": 1, "fields": '${FIELDS.user}'}); allComments.push(comments);`
        )
      );
    }
  }
  codesForComments = codesForComments.flat().flat();
  const requestsForComments = commentRequestsSlicer(codesForComments);
  return requestsForComments;
};

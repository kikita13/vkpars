import { FIELDS } from "./fields";

export const useCode = (props) => {
  const {number, interval, chunkSize, owner_id, post_id, code} = props
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

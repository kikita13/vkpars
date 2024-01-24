import { FIELDS } from "@consts/fields";
import { useCodeThreads } from "@consts/hooks/slicedCode";

export const threadRequestsSlicer = (threads) => {
  const max = threads.length;
  const result = [];
  const chunkSize = 20;

  let i = 0;
  while (i < max) {
    result.push(threads.slice(i, i + chunkSize));
    i += chunkSize || max % chunkSize;
  }

  return result;
};

export const threadRequests = (countThreads) => {
  let codesForThreads = [];
  for (let i in countThreads) {
    if (countThreads[i].count < 100) {
      codesForThreads.push(
        `var thr = API.wall.getComments({"owner_id":'${countThreads[i].owner_id}',"post_id": '${countThreads[i].post_id}',"count":'${countThreads[i].count}',"comment_id": '${countThreads[i].comment_id}', "extended": 1, "fields": '${FIELDS.user}'}); threads.push(thr);`
      );
    } else if (countThreads[i].count > 100) {
      codesForThreads.push(
        useCodeThreads(
          countThreads[i].count,
          countThreads[i].owner_id,
          countThreads[i].post_id,
          countThreads[i].comment_id,
          `var thr = API.wall.getComments({"owner_id":'|',"post_id": '|',"count":'|',"offset":'|',"comment_id":'|', "extended": 1, "fields": '${FIELDS.user}'}); threads.push(thr);`
        )
      );
    }
  }

  codesForThreads = codesForThreads.flat().flat();

  const requestsForThreads = threadRequestsSlicer(codesForThreads);
  
  return requestsForThreads;
};

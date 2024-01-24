export const useCodePosts = (num, id, code) => {
  const offsets = [];
  const splitCode = code.split("|");
  const interval = 100;
  const size = 24;
  
  let count = 100;

  for (let i = 0; i < num; i += interval) {
    offsets.push(
      `${splitCode[0]}${i}${splitCode[1]}${
        i < num - interval ? count : num % count || 100
      }${splitCode[2]}${id}${splitCode[3]}`
    );
  }

  let j = 0;

  const result = [];

  while (result.flat().length < offsets.length) {
    result.push(offsets.slice(j, j + size));
    j += size;
  }

  return result;
};

export const useCodeComments = (num, owner_id, post_id, code) => {
  const offsets = [];
  const splitCode = code.split("|");
  const interval = 100;
  const size = 24;

  let count = 100;

  for (let i = 0; i < num; i += interval) {
    offsets.push(
      `${splitCode[0]}${owner_id}${splitCode[1]}${post_id}${splitCode[2]}${
        i < num - interval ? count : num % count || 100
      }${splitCode[3]}${i}${splitCode[4]}`
    );
  }

  let j = 0;

  const result = [];

  while (result.flat().length < offsets.length) {
    result.push(offsets.slice(j, j + size));
    j += size;
  }

  return result;
};

export const useCodeThreads = (num, owner_id, post_id, comment_id, code) => {
  const offsets = [];
  const splitCode = code.split("|");
  console.log(splitCode);
  const interval = 100;
  const size = 24;

  let count = 100;

  for (let i = 0; i < num; i += interval) {
    offsets.push(
      `${splitCode[0]}${owner_id}${splitCode[1]}${post_id}${splitCode[2]}${
        i < num - interval ? count : num % count || 100
      }${splitCode[3]}${i}${splitCode[4]}${comment_id}${splitCode[5]}`
    );
  }

  let j = 0;

  const result = [];

  while (result.flat().length < offsets.length) {
    result.push(offsets.slice(j, j + size));
    j += size;
  }
  
  return result;
};

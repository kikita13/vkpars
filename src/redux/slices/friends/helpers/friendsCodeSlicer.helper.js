import { FIELDS } from "@consts/fields";

export const useCodeFriends = (num, id, code) => {
  const offsets = [];
  const splitCode = code.split("|");
  const interval = id > 0 ? 5000 : 1000;
  const count = id > 0 ? 5000 : 1000;
  const size = 24;
  for (let i = 0; i < num; i += interval) {
    offsets.push(
      `${splitCode[0]}${Math.abs(id)}${splitCode[1]}${
        i < num - interval ? count : num % count || count
      }${splitCode[2]}${i}${splitCode[3]}${FIELDS.friends}${splitCode[4]}`
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

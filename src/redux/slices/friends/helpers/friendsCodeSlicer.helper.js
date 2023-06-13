import { FIELDS } from "@consts/fields";

export const useCodeFriends = (num, id, code) => {
  const offsets = [];
  const splitCode = code.split('|')
  const interval = 5000;
  const count = 5000
  const size = 24; 
  for(let i = 0; i < num; i += interval) {
    offsets.push(`${splitCode[0]}${id}${splitCode[1]}${i < num - interval ? count : num % count || 5000}${splitCode[2]}${i}${splitCode[3]}${FIELDS.friends}${splitCode[4]}`)
  }
  let j = 0;
  const result = []
  while(result.flat().length < offsets.length) {
    result.push(offsets.slice(j, j+size))
    j += size;
  }
  return result
}






import { useAges } from "@consts/hooks/ages"
import { useSex } from "@consts/hooks/sex"

export const usersFilter = (users, cities, ageOver, ageLess, first_names, last_names, sex) => {
 const filtered =  users
  ?.filter( user => first_names ? first_names.some(word => user.first_name.toLowerCase().includes(word))    : true)
  ?.filter( user => last_names  ? last_names.some(word => user.last_name.toLowerCase().includes(word))    : true)
  ?.filter( user => ageOver     ? useAges(user?.bdate)              >= ageOver                  : true)
  ?.filter( user => ageLess     ? useAges(user?.bdate)              <= ageLess                  : true)
  ?.filter( user => cities      ? cities.some(word => user?.city?.title.toLowerCase().includes(word))       : true)
  ?.filter( user => sex         ? useSex(user?.sex).toLowerCase()   == sex?.toLowerCase()       : true)
  return filtered
}



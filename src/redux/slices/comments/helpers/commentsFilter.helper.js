import { useAges } from "@consts/hooks/ages";

export const commentsFilter = (
  arr,
  keywords,
  ageLess,
  ageOver,
  cities,
  firstNames,
  lastNames
) => {
  const filteredArr = arr
    ?.filter((item) =>
      keywords
        ? keywords.some((word) => item.text?.toLowerCase().includes(word))
        : true
    )
    ?.filter((item) =>
      cities
        ? cities.some((word) =>
            item.user?.city?.title?.toLowerCase().includes(word)
          )
        : true
    )
    ?.filter((item) => (ageLess ? useAges(item.user?.bdate) <= ageLess : true))
    ?.filter((item) => (ageOver ? useAges(item.user?.bdate) >= ageOver : true))
    ?.filter((item) =>
      lastNames
        ? lastNames.some((word) =>
            item.user?.last_name?.toLowerCase().includes(word)
          )
        : true
    )
    ?.filter((item) =>
      firstNames
        ? firstNames.some((word) =>
            item.user?.first_name?.toLowerCase().includes(word)
          )
        : true
    );
    
  return filteredArr;
};

import { FIELDS } from '@consts/fields'
import { useCodePosts } from '@consts/hooks/slicedCode'
import { TOKEN } from '@consts/token'
import $ from 'jquery'



const allResponses = []
export const responsePosts = async (props) => {
  const codeForAccount = `var account; if (${props.id} < 0) {account = API.groups.getById({"group_id": '${-props.id}', "fields": '${FIELDS.group}'});} else {account = API.users.get({"user_ids": '${props.id}', "fields": '${FIELDS.user}'});};var profiles = [];var items = [];var groups = [];`
  const codesForPosts = useCodePosts(props.maxPosts,props.id,`var response = API.wall.get({"offset": '|',"count":'|',"owner_id": '|',"extended": '1',"fields": '${FIELDS.user}'}); items = items + response.items; profiles = profiles + response.profiles; groups = groups + response.groups;`)
    const executeRequests = codesForPosts.map((chunk,index) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {                                           
          $.ajax({                                                   
            url: "https://api.vk.com/method/execute?",
            data: {
              code: `${codeForAccount}${chunk.join('')} return { count: response.count, items: items, profiles: profiles, groups: groups, account: account };`,
              access_token: TOKEN,
              v: "5.131",
            },
            dataType: "jsonp",
            method: "GET",
            success: (data) => {
              resolve(data.response);
            },
            error: (error) => {
              console.log(error);
              reject(error);
            },
          });
        }, index * 1000/3)
      });
    });
  
    try {
      const responses = await Promise.all(executeRequests);
      allResponses.push(...responses);
    } catch (error) {
      console.log(error);;
    }

    return allResponses
}

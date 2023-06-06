import { TOKEN } from '@consts/token'
import $ from 'jquery'

const allResponses = []
export const responseThreads = async (code) => {
 const executeRequests = code.map((chunk,index) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {                                           
          $.ajax({                                                   
            url: "https://api.vk.com/method/execute?",
            data: {
              code: `var threads = []; ${chunk.join('')}; return threads;;`,
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

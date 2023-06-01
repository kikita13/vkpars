import { FIELDS } from "@consts/fields";
import { TOKEN } from "@consts/token";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $ from 'jquery'

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (props) => {
  const {id, maxPosts } = props; // достаем пропсы
  const number = maxPosts;        
  const interval = 100;           // задаем offset
  const chunkSize = 15;           // количество запросов в одном execute
  const result = [];              
  const code = [];                // массив с запросами по chunkSize штук

  for (let i = 0; i < number; i += chunkSize * interval) {                        // генерируем запросы chunkSize штук
    const chunk = [];
    for (let j = i; j < i + chunkSize * interval && j <= number; j += interval) {
      chunk.push(
        `var response = API.wall.get({"owner_id": '${id}',"count": 100,"offset": ${j},"extended": '1',"fields": '${FIELDS.user}'}); items = items + response.items; profiles = profiles + response.profiles; groups = groups + response.groups;`
      );
    }
    result.push(chunk);
  }

  for (let i = 0; i < result.length; i++) {  // пушим chunkSize штук запросов в общий массив запросов code
    code.push(result[i]);
  }

  const allResponses = [];  // дефолтное состояние всех ответов

  const executeRequests = code.map((chunk,index) => {     // маппим запросы по chunkSize штук
    return new Promise((resolve, reject) => {             // дожидаемся ответа
      setTimeout(() => {                                  // vk-api ограничивает по 3 вызова метода execute в секунду, поэьтому делаем задержку 

        $.ajax({                                          // делаем запросы на vk-api метод execute (wall.get)
          url: "https://api.vk.com/method/execute?",
          data: {
            code: `var account; if (${id} < 0) {account = API.groups.getById({"group_id": '${-id}', "fields": '${FIELDS.group}'});} else {account = API.users.get({"user_ids": '${id}', "fields": '${FIELDS.user}'});};var profiles = [];var items = [];var groups = []; ${chunk.join('')} return { count: response.count, items: items, profiles: profiles, groups: groups, account: account };`,
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
          },
        });
      }, index*1000/3)
    });
  });

  try {
    const responses = await Promise.all(executeRequests);     // дожидаемся параллельного вызова всех запросов и заносим в allResposes
    allResponses.push(...responses);
  } catch (error) {
    throw new Error(error.message);
  }

  const mergedObjectPosts = allResponses.reduce(              // объединяем одинаковые ключи в один массив постов
    (merged, current) => {
      merged.count = current.count;
      merged.profiles.push(...current.profiles);
      merged.items.push(...current.items);
      merged.groups.push(...current.groups);
      merged.account   = current.account[0];
      return merged;
    },
    { count: 0, profiles: [], items: [], groups: [] }
  );

  const haveThread = [];     // массив с id комментариев, у которых есть thread items > 0 (ответы на комментарии), чтобы не делать лишние запросы
  const comments = [];
  
  const haveComments = [];   // массив с id постов, у которых есть комментарии, чтобы не делать лишние запросы
  for(let i in mergedObjectPosts.items) {      // пушим id постов у которых есть комментарии
    if(mergedObjectPosts.items[i].comments.count > 0) {
      haveComments.push(`var comments = API.wall.getComments({"owner_id":'${id}',"post_id": '${mergedObjectPosts.items[i].id}',"count":100, "extended": 1, "fields": '${FIELDS.user}'}); allComments.push(comments);`)
    }
  }
  
  const intervalHaveComments = 10; // группируем запросы к коментариям по 10 штук
  const groupedPostsIds = [];      // получаем сгруппированные id постов у которых есть комментарии
  for(let i = 0; i < haveComments.length; i += intervalHaveComments) {
    groupedPostsIds.push(haveComments.slice(i,i+intervalHaveComments))
  }
  
  
  const codesForComments = groupedPostsIds.map((item, index) => {
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        $.ajax({                                          
          url: "https://api.vk.com/method/execute?",
          data: {
            code: `var allComments = []; ${item.join('')}; return allComments;`,
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
          },
        });
      }, index*1000/3)
    }) 
  })
  try {
    const responses = await Promise.all(codesForComments); // получаем первые 100 комментариев ко всем постам из groupedPostsIds
    comments.push(...responses);
  } catch (error) {
    console.log(error);
  }

  const mergeComments = comments.flat().reduce((result, current) => { // объединяем все ответы комментариев в один объект
    return {
      post_id: current.post_id,
      items: [...result.items, ...current.items],
      profiles: [...result.profiles, ...current.profiles],
      groups: [...result.groups, ...current.groups]
    };
  }, { items: [], profiles: [], groups: [], post_id: 0 });
  





  const mergedObject =  {posts:mergedObjectPosts, comments:mergeComments } // объединяем посты и комментарии в один объект



      for(let j in mergedObject.comments.items) {
        if( mergedObject.comments.items[j].thread.count > 0 & mergedObject.comments.items[j].from_id !== 0 ) {
          haveThread.push(`var threads = API.wall.getComments({"owner_id":'${id}',"post_id": '${mergedObject.comments.items[j].post_id}',"count":100,"comment_id": '${mergedObject.comments.items[j].id}', "extended": 1, "fields": '${FIELDS.user}'}); allThreads.push(threads);`)
        }
      }
      const intervalHaveThreads = 10; // группируем запросы к threads по 10 штук
      const groupedThreads = []
      for(let i = 0; i < haveThread.length; i += intervalHaveThreads) {
        groupedThreads.push(haveThread.slice(i,i+intervalHaveThreads))
      }

      const threads = [];
      const codesForThreads = groupedThreads.map((item, index) => {
    
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            $.ajax({                                          
              url: "https://api.vk.com/method/execute?",
              data: {
                code: `var allThreads = []; ${item.join('')}; return allThreads;`,
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
              },
            });
          }, index*1000/3)
        }) 
      })
      try {
        const responses = await Promise.all(codesForThreads); // получаем первые 100 комментариев ко всем постам из groupedPostsIds
        threads.push(...responses);
      } catch (error) {
        console.log(error);
      }
    
const thr = threads.flat()
const prfls = []
const grps = []
for(let i in thr){
  prfls.push(...thr[i]?.profiles)
  grps.push(...thr[i]?.groups)
}

const concatProfiles = mergedObject.posts.profiles.concat(mergedObject.comments.profiles).concat(prfls)  // объединяем все профили в один объект
const mergeProfiles = concatProfiles.reduce((acc, curr) => {                               // и убираем дубликаты
  if(!acc.find(v => v.id == curr.id)){
    acc.push(curr)
  } return acc},[])

  const concatGroups = mergedObject.posts.groups.concat(mergedObject.comments.groups).concat(grps)    // объединяем все группы в один объект
  const mergeGroups = concatGroups.reduce((acc, curr) => {                                            // и убираем дубликаты
    if(!acc.find(v => v.id == curr.id)){
      acc.push(curr)
    } return acc},[])

    const threadItems = []
    thr.forEach(el => threadItems.push(...el.items))


    const postsWithComments = mergedObject.posts.items.map(post => {
      const comm = mergedObject.comments.items.filter(comment => post.id == comment.post_id)
      post.comments.items = comm
    })



return {posts: mergedObject.posts.items, comments: mergedObject.comments.items, profiles: mergeProfiles, groups: mergeGroups, threads: threadItems, postsWithComments};
});

const initialState = {
  comments: [],
  status: "",
  error: "",
};

const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.comments = action.payload;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
}); 

export const {} = comments.actions;

export const commentsReducer = comments.reducer;

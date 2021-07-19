import moment from 'moment';

export function getChatUsersList(chat) {
  let res = "";
  if (chat["userIds"] !== undefined) {
    res = chat["userIds"].map(user => {
      return user.userName;
    }).join(', ');
  }
  return res;
}

export let get = (route) => fetch(`http://localhost:8080/api/${route}`, {
  credentials: 'include',
  mode: 'cors'
}).then(res => res.json())

export let post = (route, body) => fetch(`http://localhost:8080/api/${route}`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
});


export const formatDate = (timestamp) => {
    return moment(timestamp).calendar();
}



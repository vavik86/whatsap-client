import React, { useEffect, useRef, useState } from 'react';
import { Messages } from './Messages';
import { Pane, Panes } from './Panes';
import { Chats } from './Chats';
import { MessageForm } from './MessageForm';
import { getChatUsersList, get, post } from './utils';
import { UsersContext } from './UsersContext';
import { ProfileSection } from './ProfileSection';
import { ChatHeader } from './ChatHeader';
import { SearchPeople } from './SearchPeople';

export function App() {
  let [chats, setChats] = useState([]);
  let [chatId, setChatId] = useState(null);
  let [newChatId, setNewChatId] = useState(null);
  let [messages, setMessages] = useState([]);
  let [lastPoll, setLastPoll] = useState(Date.now());
  let [myUser, setMyUser] = useState({});
  let [friends, setFriends] = useState([]);
  let timer = useRef(null);
  let usersContext = useRef({});

  useEffect(loadMyUser, []);
  useEffect(loadMyFriends, [myUser]);
  useEffect(updateUsersContext, [myUser, friends]);
  useEffect(loadChats, [myUser?._id, newChatId, lastPoll]);
  useEffect(loadMessages, [chatId, lastPoll]);
  useEffect(startTimer, [lastPoll]);

  let selectedChat = chats.find((chat) => chat._id === chatId) || [];
  let lastPollDisplay = (() => {
    let now = new Date(lastPoll);
    return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  })();


  return (

    <UsersContext.Provider value={usersContext.current} style={{overflow:'hidden',maxHeight:'100%'}}>
      <Panes>
        <Pane width={'35%'} minWidth={'300px'}
          header={<ProfileSection></ProfileSection>}
          body={<>
            <SearchPeople onFoundUserClick={onFoundUserClick} />
            <Chats chats={chats} onSelectChat={setChatId}></Chats></>}>
        </Pane>
        <Pane width={'65%'}
          header={<ChatHeader profileImg={selectedChat.picURL} name={selectedChat.chatName}
            friendInfo={getChatUsersList(selectedChat)} />}
          //{`${selectedChat.chatName} ${getChatUsersList(selectedChat)}`}
          body={<Messages messages={messages}></Messages>}
          footer={<MessageForm onNewMessage={onNewMessage}></MessageForm>}
          lastScroll={lastPoll}>
        </Pane>
      </Panes>
    </UsersContext.Provider>);

  function loadMyUser() {
    get('me')
      .then(user => {
        setMyUser(user);
      });
  }

  function loadMyFriends() {
    if (!myUser._id) {
      return;
    }
    get('users')
      .then(users => {
        let friends = users.filter(u => u._id !== myUser._id);
        setFriends(friends);
      });
  }

  function onFoundUserClick(foundUserId) {
    if (myUser._id !== foundUserId) {
      let cName = friends.find(u => u._id === foundUserId);
      post('chats', {
        userIds: [myUser._id, foundUserId],
        chatName: cName.userName
      })
        .then(newChat => {
          setNewChatId(newChat._id);
        });
    }
  }

  function onNewMessage(body) {
    let newMessage = {
      chat: chatId,
      text: body,
      date: String(new Date()),
      picURL: '',
      author: myUser
    };
    post(`chats/${chatId}/messages`, newMessage);
    console.log(`Sending to the server: ${JSON.stringify(newMessage)}`);
    setLastPoll(Date.now());

  }

  function loadChats() {
    if (!myUser._id) {
      return;
    }
    get(`chats?userid=${myUser._id}`)
      .then(chats => {
        setChats(chats);
        setChatId(chats[0]._id);
      });
  }

  function loadMessages() {
    if (!chatId) {
      return;
    }
    get(`chats/${chatId}/messages`)
      .then((messages) => {
        setMessages(messages);
      })
  }

  function startTimer() {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setLastPoll(new Date(Date.now()).toLocaleString("en-US"));
    }, 5000);
  }


  function updateUsersContext() {
    let newUsersContext = {
      myUser,
      allUsers: friends.concat(myUser).reduce((map, user) => {
        map[user._id] = user;
        return map;
      }, {})
    };
    usersContext.current=newUsersContext;
  }


}

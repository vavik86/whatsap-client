import React, { useContext, useEffect } from 'react';
import styled from 'styled-components/macro';
import { UsersContext } from './UsersContext';
import randomColor from "randomcolor";

let Chat = styled.div({
  border: '1px solid',
  borderBottom: '1px solid',
  padding: '0.5em',
  cursor: 'pointer',
  margin: '4px 0',
  background: 'white',
  display: 'flex',
  alignItems: 'center'
});

const ChatsContainer = {
  height: '100%'
}

const ChatContainer = {
  background: '#ededed',
  minHeight: '59px',
  height: 'calc( 100vh - 186px)',
  margin: '0',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '15px'
}

const profile_section = {
  display: 'flex',
  alignitems: 'center',
  justifycontent: 'space-between',
  minheight: '59px',
  padding: '4px'

};
const img_container = {
  width: '26px',
  height: '26px',
  borderRadius: '50px',
  overflow: 'hidden',
  display: 'flex',
  color: 'rgb(256, 256, 256)',
  background: `${randomColor()}`,
  border: '1px solid rgb(221, 221, 221)',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: '700'
};

const RandomColor = {
  background: `${randomColor()}`
}

const img = {
  width: '100%',
  height: '100%'
};
export function Chats(props) {
  let currentContext = useContext(UsersContext);

  const ProfileImg = (chat) => {
    if (chat.picURL !== undefined) {
      return <img src={chat.picUL} />;
    } else {
      return <label>{getInitials(chat.chatName)}</label>;
    }
  };

  useEffect(() => {
    console.log(currentContext);
  }, [currentContext]);

  return (
    <ul style={ChatContainer}>
      {props.chats.map(chat => {
        return <div>
          <Chat key={chat._id} onClick={() => props.onSelectChat(chat._id)}>
            <div style={profile_section} >
              <div style={img_container}>
                {ProfileImg(chat)}
              </div>
            </div>
            {chat.chatName}
          </Chat>
        </div>
      })}
    </ul>)

  function getInitials(chatName) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
    if (rgx !== undefined) {

      let initials = [...chatName.matchAll(rgx)] || [];

      initials = (
        (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
      ).toUpperCase();
      return initials;
    }
  } 

}
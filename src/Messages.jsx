import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { UsersContext } from './UsersContext';

let Message = styled.div({
  border: '1px solid',
  padding: '0.5em',
  lineHeight: '22px',
  padding: '15px',
  background: '#fff',
  borderRadius: '11px',
  marginBottom: '20px',
  clear: 'both',
  minWidth: '50px',
  position: 'relative',
  '&::after': {
    content: " ",
    position: 'absolute',
    width: '0',
    height: '0',
    top: '0',
    bottom: 'auto',
    border: '22px solid'
  }
});

const msg = {
  color: '#000',
  fontSize: '15px',
  margin: '3px 10px'
};
const time = {
  position: 'absolute',
  bottom: '5px',
  right: '10px',
  color: '#00000073',
  fontSize: '11px',
};

const me = {
  float: 'right',
  marginLeft: '10%',
  background: '#dbf8c6',
  right: '15px',
  '&::after': {
    left: 'auto',
    right: '-12px',
    borderColor: '#dbf8c6 transparent transparent transparent',
  }
}

const you = {
  float: 'left',
  marginRight: '10%',
  fontSize: '14px',
  left: '15px',
  'you::after': {
    left: '-12px',
    right: 'auto',
    borderColor: ' #fff transparent transparent transparent',
  }
};
const name = {
  fontWeight: '500',
  color: '#36cd96',
  marginTop:'0'
};
const hide={
  display:'none'
};
const ChatSection = {
  flex: '1',
  background: '#e5ddd5',
  padding: '20px 20px',
  overflowY: 'scroll',
  height: 'calc( 100vh - 186px)'
}

export function Messages(props) {
  let usersContext = useContext(UsersContext);

  if (!props.messages) {
    return '';
  }
  return <ul style={ChatSection}>
    {props.messages.map(message => {
      let authorId = message.author._id;
      let authorName = usersContext.allUsers?.[authorId];
      return <Message key={message._id} style={message.author._id == usersContext.myUser._id ? me : you} >
        {/* <p>chatId: {message.chat}</p> */}
        {/* <p>messageId: {message._id}</p> */}
        <p style={message.author._id == usersContext.myUser._id ? hide : name} > {authorName}</p>
        <p style={msg}>{message.text}</p>
      </Message>;
    })}
  </ul>;
}

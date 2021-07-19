import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Input = {
  flex: '1',
  height: '40px',
  width: '85%',
  border: '1px solid black',
  borderRadius: '50px',
  padding: '0 20px',
  outline: 'none',
  fontsize: '16px',
  color: '#555',
  marginLeft: '11px'
};

const iconBlock = {
  position: 'relative',
  left: '0',
  top: '2px',
  color: 'rgb(145, 145, 145)',
  fontSize: '13px',
  background: 'lightseagreen',
  borderRadius: ' 50%',
  padding: '13px',
  transform: 'rotatez(-40deg) scalex(-1)'
};

const InputContainer = {
  display: 'flex',
  position: 'relative',
  bottom: '12px'
};

export function MessageForm({ onNewMessage }) {
  return <form onSubmit={onSubmit} style={InputContainer}>
    <FontAwesomeIcon style={iconBlock} icon={faPaperPlane}/> 
    <input style={Input} id={'newMessage'}></input>
  </form>;

  function onSubmit(e) {
    e.preventDefault();
    onNewMessage(e.target.newMessage.value);
  }
}
//onClick={onSubmit}
// const form = styled.div({
//   backgroundColor: 'lavenderblush '
// });
// const img = styled.img({
//   backgroundColor: 'limegreen',
//   color: 'white',
//   borderradius: '50%',
//   width: '20px',
//   imagesource:'src/assets/icons/paper-plane.svg'
// });

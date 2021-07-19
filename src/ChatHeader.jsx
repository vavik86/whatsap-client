import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from './utils';
import styled from 'styled-components';

const chatHeader = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'spaceBetween',
    background: '#ededed',
    minHeight: '59px',
    padding: '0 15px',
    fontSize: '23px'
};

const imgContainer = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#eee',
    fontSize: '25px',
    color: '#555'
};
const img = {
    width: '100%',
    height: '100%'
};

const actionItems = {
    color: ' #919191',
};
const iconBlock = {
    padding: '10px',
    cursor: 'pointer'
};
const cardDetail = {
    marginLeft: '15px',
    flex: '1'
};
const title = {
    fontWeight: '500',
    margin: '0',
    marginBottom: '5px',
    color: '#333'
};
const desc = {
    margin: '0',
    color: '#00000099',
    fontSize: '15px'
};
const members={
fontSize:'16px'
}




export const ChatHeader = ({ friendInfo, profileImg, name }) => {
    return (
        <div style={chatHeader}>
            <div style={imgContainer}>
                {profileImg ? (
                    <img
                        alt="image"
                        src={profileImg}
                    />
                ) :
                    <FontAwesomeIcon style={iconBlock} icon={faUser} />}
            </div>
            <div style={cardDetail}>
                <h4 style={title}>{name ? name : ""}</h4>
                <label style={members}>{friendInfo}</label>
            </div>
        </div>
   
    
    );
};

export default ChatHeader;
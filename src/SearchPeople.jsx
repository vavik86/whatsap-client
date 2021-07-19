import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { get } from './utils';

const search = {
    minHeight: '30px',
    background: '#ededed',
    display: 'block',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: '12px'
}
const iconBlock = {
    position: 'relative',
    left: '30px',
    color: '#919191',
    fontSize: '14px'
}
const input = {
    width: 'calc(100% - 80px)',
    height: '30px',
    border: '1px solid black',
    borderRadius: '20px',
    paddingLeft: '50px',
    outline: 'none',
    fontSize: '16px',
    color: '#919191'
};


export function SearchPeople({ onFoundUserClick }) {
    let [foundUsers, setFoundUsers] = useState([]);

    return <div style={search}>
        <FontAwesomeIcon style={iconBlock} icon={faSearch} />
        <input style={input} placeholder="search" onChange={(e) => {
            get(`users?search=${e.target.value}`)
                .then(users => {
                    setFoundUsers(users);
                })
        }}></input>
        <div>
            results: {foundUsers.map(u => <button key={u._id} data-user-id={u._id} onClick={(e) => {
                onFoundUserClick(e.target.dataset.userId);
            }}>
                {u.userName}
            </button>)}
        </div>
    </div>;
};



export default SearchPeople;
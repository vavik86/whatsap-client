import React from 'react';
import { useContext } from 'react';
import { UsersContext } from './UsersContext';
import pic from  './assets/vavik.jpg';

const profile_section = {
    display: 'flex',
    alignitems: 'center',
    justifycontent: 'space-between',
    background: '#ededed',
    minheight: '59px',
    padding: '0'

};
const img_container = {
    width: '40px',
    height: '40px',
    borderRadius: '50px',
    overflow: 'hidden',
    display: 'flex',
    alignitems: 'center',
    justifycontent: 'center',
    background: '#eee',
    fontsize: '25px',
    color: '#555',
    border: '1px solid #ddd',
    marginLeft:'14px'
};

const img = {
    width: '100%',
    height: '100%'
};
const image={
    width:'inherit'
};

export const ProfileSection = () => {
    const userObj = useContext(UsersContext);
    const { picURL, name } = userObj;
    return (
        <div style={profile_section}>
            <div style={img_container}>
                <img  style={image} alt="user pic" src={pic} />
            </div>
            {name}
        </div>
     )
}

export default ProfileSection;
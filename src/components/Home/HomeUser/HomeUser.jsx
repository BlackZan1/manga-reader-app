import React from 'react';
import { Avatar } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';

const HomeUser = ({ username, email }) => {
    return (
        <div className='home-info'>
            <Avatar size={96} icon={<AiOutlineUser />} />

            <div className='home-info-contact'>
                <h1>{username}</h1>
                <h2>{email}</h2>
            </div>
        </div>
    )
}

export default HomeUser;
import React from 'react';
import { Menu, Button, Badge } from 'antd';
import { NavLink } from 'react-router-dom';
import { AiOutlineExport, AiOutlineUser } from 'react-icons/ai';

import './MainHeaderMenu.scss';

const MainHeaderMenu = ({ favouritesManga, favouritesChapters, waitingList, onClickHandler }) => {
    return (
        <Menu>
            <Menu.Item style={{borderBottom: '1px solid #dcdcdc'}}>
                <NavLink to={'/home'}> 
                    <AiOutlineUser /> Profile
                </NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to={'/home'}>
                    <Badge count={favouritesManga.length} style={{ backgroundColor: 'deeppink' }}>
                        Manga
                    </Badge>
                </NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to={'/home'}>
                    <Badge count={favouritesChapters.length} style={{ backgroundColor: '#52c41a' }}>
                        Chapters
                    </Badge>
                </NavLink>
            </Menu.Item>
            <Menu.Item style={{borderBottom: '1px solid #dcdcdc'}}>
                <NavLink to={'/home'}>
                    <Badge count={waitingList.length} style={{ backgroundColor: 'dodgerblue' }}>
                        Waiting list
                    </Badge>
                </NavLink>
            </Menu.Item>
            <Menu.Item style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Button onClick={onClickHandler} type={'ghost'} size={'middle'} style={{display: 'flex', alignItems: 'center', borderRadius: 7}}>
                    <AiOutlineExport /> &nbsp; Log out
                </Button>
            </Menu.Item>
        </Menu>
    )
}

export default MainHeaderMenu;
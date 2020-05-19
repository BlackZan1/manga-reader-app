import React, { Fragment, useState } from 'react';
import { Dropdown, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { AiOutlineUser, AiOutlineSearch, AiOutlineExport } from 'react-icons/ai';

import Logo from '../../../img/loader.gif';
import MainHeaderMenuContainer from './MainHeaderMenu/MainHeaderMenuContainer';

import './MainHeader.scss';
import DrawerContainer from './Drawer/DrawerContainer';

const MainHeader = ({ isAuth }) => {
    let [drawerMode, setDrawerMode] = useState(false);

    const onClickHandler = () => {
        console.log(!drawerMode)

        setDrawerMode(!drawerMode);
    }

    let fadeDrop = {
        right: drawerMode ? '0px' : '-100%'
    }

    return (
        <header className='main-header'>
            <div className='main-header-left'>
                <div className='main-header-logo'>
                    <img src={Logo} alt="Logo" />
                </div>

                <NavLink to={'/'} className='main-header-logo-title'>
                    Ani<span>.Ma</span>
                </NavLink>
            </div>
            
            <div className='main-header-right'>
                <NavLink to={'/search'} className='main-header-search-link'>
                    <AiOutlineSearch />&nbsp;Search
                </NavLink>

                {
                    isAuth ?
                    <Fragment>
                        <div className='main-header-auth'>
                            <AiOutlineUser />
                        </div>

                        <Dropdown overlay={<MainHeaderMenuContainer />} placement='bottomRight'>
                            <DownOutlined style={{fontSize: '22px', cursor: 'pointer'}} />
                        </Dropdown>
                    </Fragment>
                    :
                    <Fragment>
                        <NavLink to={'/login'} className='main-header-login-btn'>
                            Login
                        </NavLink>

                        <NavLink to={'/signup'} className='main-header-signup-btn'>
                            Sign Up
                        </NavLink>
                    </Fragment>
                }
            </div>

            <div className='main-header-drawer' onClick={onClickHandler}>
                <div className={`hamburger hamburger--spin ${drawerMode ? 'is-active' : ''}`}>
                    <div className='hamburger-box'>
                        <div className='hamburger-inner'>
                        </div>
                    </div>
                </div>
            </div>

            <DrawerContainer isAuth={isAuth} fadeDrop={fadeDrop} />
        </header>
    )
}

export default MainHeader;
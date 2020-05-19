import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineUser, AiOutlineSearch, AiOutlineExport } from 'react-icons/ai';
import { Button, Badge } from 'antd';

const Drawer = ({ 
    isAuth, 
    fadeDrop, 
    username, 
    favouritesManga, 
    favouritesChapters, 
    waitingList,
    onClickHandler
    }) => {
    let fullname = username;

    if(username.length > 10) fullname = fullname.slice(0, 10 - 3) + '...';

    return (
        <div className='main-header-drawer-modal' style={{right: fadeDrop.right}}>
            <NavLink style={{borderBottom: '1px solid #fff', padding: '0 10px 15px'}} to={'/search'} className='main-header-search-link'>
                <AiOutlineSearch /> &nbsp; Search
            </NavLink>

            {
                isAuth ?
                <Fragment>
                    <div className='drawer-modal-info'>
                        <div className='main-header-auth'>
                            <AiOutlineUser />
                        </div>

                        {fullname}
                    </div>

                    <div className='drawer-modal-menu'>
                        <NavLink to={'/home'} style={{marginBottom: 10}}> 
                            <AiOutlineUser /> Profile
                        </NavLink>

                        <NavLink to={'/home'}> 
                            <Badge count={favouritesManga.length} style={{ backgroundColor: 'deeppink' }}>
                                Manga
                            </Badge>
                        </NavLink>

                        <NavLink to={'/home'}> 
                            <Badge count={favouritesChapters.length} style={{ backgroundColor: '#52c41a' }}>
                                Chapters
                            </Badge>
                        </NavLink>

                        <NavLink to={'/home'}> 
                            <Badge count={waitingList.length} style={{ backgroundColor: 'dodgerblue' }}>
                                Waiting list
                            </Badge>
                        </NavLink>

                        <Button onClick={onClickHandler} type={'ghost'} size={'large'} style={{display: 'flex', alignItems: 'center', borderRadius: 7, color: '#fff', marginTop: '30px'}}>
                            <AiOutlineExport /> &nbsp; Log out
                        </Button>
                    </div>
                </Fragment>
                :
                <Fragment>
                    <NavLink to={'/login'} className='main-header-login-btn'> 
                        Login
                    </NavLink>

                    <NavLink to={'/signup'} className='main-header-signup-btn' style={{color: 'hotpink'}}>
                        Sign Up
                    </NavLink>
                </Fragment>
            }
        </div>
    )
}

export default Drawer;
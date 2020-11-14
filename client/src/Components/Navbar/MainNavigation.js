import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import UserMode from '../../Containers/Users/UserMode';

const { Item } = Menu;

const style = {
    navbar: {
        display: 'flex',
        padding: 0,
        width: '100vw'
    }
}

export default function MainMenu (props) {
    const {modal, setModal} = props;
    const isUserSigned = localStorage.getItem('User');


    return (
        <Menu mode="horizontal" style={style.navbar}>
            <Item>Catalog</Item>
            <Item>Benefits</Item>
            <Item>Services</Item>
            <Item>Contacts</Item>
            <Item>FAQ</Item>
            <Item>
                {
                    isUserSigned ?
                        <Link to="/dashboard">
                            Dashboard
                        </Link> :
                        <Link onClick={() => setModal(!modal)}>
                            Sign-in
                        </Link>
                }
                
            </Item>
            <Item>Register</Item>
            <UserMode />
        </Menu> 
    )
}
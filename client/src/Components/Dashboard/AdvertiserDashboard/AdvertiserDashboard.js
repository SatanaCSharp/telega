import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
const  { Item } = Menu; 

export default function AdvertiserDashboard (props) {
    const [current, setCurrent] = useState('');
    
    const handleClick = () => {

    }

    useEffect(() => {

    }, [])

    return (
        <div>
            <Menu mode="horizontal" onClick={handleClick}>
                <Item key="list">Channels list</Item>
                <Item key="stats">Stats</Item>
                <Item key="ad">Ad posting</Item> 
            </Menu>
        </div>
    )
}
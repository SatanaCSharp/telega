import React, { useState } from 'react';
import { Menu } from 'antd';
import ChannelsList from '../../../Containers/ChannelOwner/ChannelsList';

const  { Item } = Menu; 

const style = {
    menu: {
        alignSelf: 'center',
        width: '100%'
    }
}


export default function ChannelOwnerDashboard (props) {
    const [current, setCurrent] = useState('list')

    const handleClick = (e) => {
        setCurrent(e.key);
    }

    const currentContent = () => {
        switch (current) {
            case 'list':
                return <ChannelsList />
                break;
            case 'stats':
                return <p>Stats</p>
                break;
            case 'deals':
                return <p>Deals</p>
                break;
        }
    }

    return (
        <div style={style.menu}>
            <Menu selectedKeys={current} mode="horizontal" onClick={handleClick} style={{width: '100%'}}>
                <Item key="list">Channels list</Item>
                <Item key="stats">Statistics</Item>
                <Item key="deals">Deals</Item>  
            </Menu>
            <div>
                {
                    currentContent()
                }
            </div>
        </div> 
    )
}
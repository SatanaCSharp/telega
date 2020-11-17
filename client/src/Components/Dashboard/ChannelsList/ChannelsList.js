import React, {useEffect, useState } from 'react';
import { List } from 'antd';
import Channel from '../../../Containers/Dashboards/ChannelOwner/Channel';

export default function ChannelsList (props) {
    const [modal, setModalState] = useState(false);

    useEffect (() => {
        props.getAllChannels();
    }) 
        
    return (
        <List
            itemLayout="vertical"
            dataSource={props.channels}
            renderItem= {
                item => (
                    <Channel id={item.id} modal={modal} setModalState={setModalState }/>
                )
            }
        >  
        </List>
    )
}
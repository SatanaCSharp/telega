import React, {useEffect, useState } from 'react';
import { List, Avatar } from 'antd';
import DateFormat from '../../../Helpers/Common/DateFormat';
import { Card } from 'antd';
import PostToChannel from './PostToChannel';

const style = {
    cardHeader: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignSelf: 'center'
    },
    channelCard : {
        display: 'flex',
        flexDirection: ' column',
        justifyContent: 'center'
    },
}

export default function ChannelsList (props) {
    const [open, setOpen] = useState(false);

    console.log(props.channels);
    useEffect (() => {
        props.getAllChannels();
    }, []) 
        

    return (
        <List
            itemLayout="vertical"
            dataSource={props.channels}
            renderItem= {
                item => (
                    <List.Item style={style.channelCard} >
                        <Card onClick={() => setOpen(!open)} >
                            <Avatar src="" />
                            <h4>{item.title}</h4>
                            <h4>Description: {item.about}</h4>
                            <h4>Subscribers count: {item.participants_count}</h4>
                            <h4>Created at: {DateFormat(item.date)}</h4>    
                        </Card>
                        {
                            open ? 
                                <PostToChannel open={open} setModal={setOpen} channel={item}/> : null
                        }  
                    </List.Item>
                )
            }
        >  
        </List>
    )
}
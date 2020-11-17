import React, { useEffect, useState, Fragment } from 'react';
import DateFormat from '../../../Helpers/Common/DateFormat';
import { Card, Avatar, List, Button } from 'antd';
import PostToChannel from './PostToChannel';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons'; 

const getStyle = () => ({
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
    }
})

export default function Channel (props) {
    const [open, setOpen] = useState(false);
    const [isBot, setBot] = useState(false);
    const { item } = props;

    const style = getStyle();


    useEffect(() => {
        props.checkBot(item).then(res => res.json()).then(({ status }) => setBot(status))
    })

    return (
        <Fragment>
            <List.Item style={style.channelCard} >
                <Card>
                    <Avatar src="" />
                    <p>{isBot ? <CheckOutlined/> : <CloseOutlined />}</p>
                    <Button disabled={isBot ? '': 'disabled'}onClick={() => setOpen(true)}>Post to channel</Button>
                    <h4>{item.title}</h4>
                    <h4>Description: {item.about}</h4>
                    <h4>Subscribers count: {item.participants_count}</h4>
                    <h4>Created at: {DateFormat(item.date)}</h4>    
                </Card>     
            </List.Item>
            {
                open ? 
                    <PostToChannel open={open} setModal={setOpen} channel={item}/> : null
            }  
        </Fragment>
    )
}
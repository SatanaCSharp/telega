import React, {useEffect} from 'react';
import { List, Avatar } from 'antd';
import DateFormat from '../../../Helpers/Common/DateFormat';
import MessageBot from '../../../Helpers/Bots/SendMessageToBot';
import { Card } from 'antd';

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

    console.log(props )
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
                        <Card onClick={() => console.log(`send message to ${item.id}`)} >
                            <Avatar src="" />
                            <h4>{item.title}</h4>
                            <h4>Description: {item.about}</h4>
                            <h4>Subscribers count: {item.participants_count}</h4>
                            <h4>Created at: {DateFormat(item.date)}</h4>    
                        </Card> 
                    </List.Item>
                )
            }
        >
        </List>
    )
}
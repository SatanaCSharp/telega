import React, { useRef } from 'react';
import { Card, Input, Button } from 'antd';
import SendMessage from '../../../Helpers/Bots/SendMessageToBot';
import GetMessage from '../../../Helpers/Channels/GetMessageById';

const { TextArea } = Input;

const style = {
    modalBackdrop: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(41,33,48,0.9)',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        maxHeight: '100vh',
        overflowY: 'hidden',
        zIndex: 99999,
    }, 
    modal: {
        width: '50vw',
        minWidth: '50vw'
    }
}

export default function PostToChannel (props) {
    const { open, setModal, channel } = props;
    const textArea = useRef('');
    
    const makePost = ({ username }, {current:{ state: {value}}}) => {
        SendMessage(username, value).then(res => res.json()).then(res => {
            return GetMessage(channel, res)
        }).then(res => console.log(res.messages));
    }


    return (
        <div style={style.modalBackdrop} onClick={() => setModal(!open)}>
            <Card title="Post to channel" style={style.modal} onClick={(e) => e.stopPropagation()}>
                <TextArea rows={4} ref={textArea}/>
                <Button type="primary" onClick={() => makePost(channel, textArea)}>Post</Button>
            </Card>
        </div>
    )
}
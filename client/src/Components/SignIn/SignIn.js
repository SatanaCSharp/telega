import React from 'react';
import { Card } from 'antd';
import { Tabs } from 'antd';
import Telegram from './Telegram/TelegramSignIn';

const { TabPane } = Tabs;

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

export default function SignIn(props) {
    const {modal, setModal} = props

    return (
        <div style={style.modalBackdrop} onClick={() => setModal(!modal)}>
            <Card title="Sign in via Telegram or creds" style={style.modal} onClick={(e) => e.stopPropagation()}>
                <Tabs>
                    <TabPane key="1" tab="With Telegram">
                        <Telegram />
                    </TabPane>
                    <TabPane key="2" tab="With credentials">
                        Sign-in with credentials
                    </TabPane>
                </Tabs>
            </Card> 
        </div>
    )
}
import React from 'react';
import { Avatar } from 'antd';
import { Card } from 'antd';

const UserInformationCard = { 
    display: 'flex',
    justifyContent: 'center'
}


export default function UserInformation (props) {
    try {
        const { user } = props;
        console.log(user);
        localStorage.setItem('User', JSON.stringify(user));
    } catch(error) {
        console.log(error);
    }
        

    
    return (
        <Card title="Logged as: " style={UserInformationCard}>
            <Avatar src=""/>
        </Card> 
    )
}
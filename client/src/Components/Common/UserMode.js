import React, { Fragment } from 'react';
import { Switch } from 'antd';


const style={
    userModeSwitcher: {
        display: 'flex',
        alignContent: 'center',
        height: '100%'
    }
}

export default function UserMode (props) {

    const switcher = () => {
        props.switchMode(!props.user.mode)
    }
    
    return (
        <Fragment style={style.userModeSwitcher}>
            <Switch checkedChildren="Channel owner" unCheckedChildren="Advertiser" onChange={switcher}/>
        </Fragment>
    )
}
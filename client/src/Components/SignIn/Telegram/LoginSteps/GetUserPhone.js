import React, { useState } from 'react';
import { Input } from 'antd';
import Client from '../../../../Controllers/TelegramController';
import Alert from '../../../Common/Alert';

export default function GetUserPhone (props) {
    const [error, setError] = useState(false);

    function sendCode(number) {
        return Client.call('auth.sendCode', {
            phone_number: number,
            settings: {
              _: 'codeSettings',
            },
          });
    }

    const handleInput = async (e) => {
        const { value } = e.target
        if (value.length === 13) {
            try {
                let { phone_code_hash } = await sendCode(value);
                if(phone_code_hash) {
                    props.setPhone(value);
                    props.setHash(phone_code_hash)
                    props.next();
                } else {
                    setError(true);
                }
            } catch (error) {
                setError(true);
            }
        }
    }    
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Alert error={error} text="Wrong phone number"/>
            <Input placeholder="Enter your phone" onChange={handleInput} style={{marginTop: '10px', width: '250px'}}/>
        </div>
    )
}
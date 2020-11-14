import React, { useState } from 'react';
import { Input } from 'antd';
import Client from '../../../../Controllers/TelegramController';
import Alert from '../../../Common/Alert';

export default function GetSecurityCode (props) {
    const [error, setError] = useState(false);

    function signIn({code, phone, phone_code_hash}) {
        return Client.call('auth.signIn', {
            phone_code: code,
            phone_number: phone,
            phone_code_hash: phone_code_hash,
        });
    }

    const handleInput = async (e) => {
        const { value } = e.target;
        if(value.length === 5) {
            try {
                const { user } = await signIn({
                    code: value,
                    phone: props.phone,
                    phone_code_hash: props.hash
                });
                if(user) {
                    props.setUser(user);
                    props.next()
                } else {
                    setError(true)
                }
            } catch (error) {
                setError(true);
            }    
        }
        
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Alert error={error} message="Wrong security code"/>
            <Input placeholder="Enter your security code" onChange={handleInput} style={{marginTop: '10px'}}/>
        </div>
    )
}
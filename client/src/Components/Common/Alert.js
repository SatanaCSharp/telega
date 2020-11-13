import React, {Fragment} from 'react';
import { Alert } from 'antd';

export default function AlertMessage (props) {
    const { error, text } = props;
    return (
        <Fragment> 
            {
                props.error ? 
                    <Alert message={text} type="error"/> :
                    null
            }
        </Fragment>
    )
}
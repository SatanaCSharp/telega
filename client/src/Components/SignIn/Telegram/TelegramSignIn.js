import React, {useState, useEffect} from 'react';
import { Steps, Button, message } from 'antd';
import PhoneStep from './LoginSteps/GetUserPhone';
import CodeStep from './LoginSteps/ProccedSignIn';
import User from './LoginSteps/UserInformation';
import UserInformation from './LoginSteps/UserInformation';

const { Step } = Steps;

export default function TelegramLogin (props) {
    const [hash, setHash] = useState('');
    const [phone, setPhone] = useState('');
    const [user, setUser] = useState({});
    const [currentStep, setCurrentStep] = useState(0);

    const next = () => {
        setCurrentStep(currentStep +1);
    }

    const prev = () => {
        setCurrentStep(currentStep -1);
    }

    const steps = [
        {
            title: 'Enter your phone number',
            content: <PhoneStep next={next} setHash={setHash} setPhone={setPhone}/>
        },
        {
            title: 'Enter security code',
            content: <CodeStep next={next} prev={prev} hash={hash} phone={phone} setUser={setUser}/>
        },
        {
            title: 'Signed in',
            content: <UserInformation user={user}/>
        }
    ];
    
    return (
        <div>
           <Steps current={currentStep}>
                {
                    steps.map(item => (
                        <Step key={item.title} title={item.title}/>
                    ))
                } 
           </Steps>
            <div className="steps-content">{steps[currentStep].content}</div>
            {/* <div className="steps-action">
                {currentStep < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {currentStep === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {currentStep > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>  */}
        </div> 
        
    )
}
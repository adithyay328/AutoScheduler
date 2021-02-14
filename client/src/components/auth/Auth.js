import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../atoms/Header'
import { Divider } from 'antd'
import { Card, Radio } from 'antd';

// Wrappers
import AuthWrapper from '../base/wrappers/AuthWrapper'
import FormWrapper from '../base/wrappers/FormWrapper'

// Components
import ButtonComponent from '../atoms/ButtonComponent'
import InputComponent from '../atoms/InputComponent'

// Validations
import emailValidation from '../../utils/validations/emailValidation'
import usernameValidation from '../../utils/validations/usernameValidation'
import passwordValidation from '../../utils/validations/passwordValidation'

function Auth() {
    const history = useHistory();
    const [errMessage, setErrMessage] = useState('');
    const [radioValue, setRadioValue] = useState(
        history.action === 'PUSH' ? 2 : 1
    );

    const onFinishLogin = (values) => {
        console.log('Success:', values);
    };

    const onFinishRegister = (values) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Error:', errorInfo);
    };

    return (
        <>
            <Header />
            <AuthWrapper>
                <>
                    <Radio.Group
                         onChange={(e) =>
                            setRadioValue(e.target.value)
                        }
                        value={radioValue}
                    >
                        <Divider type="vertical" style={{ height: 44}} />
                        <Radio value={1} >
                            <span style={{ fontSize: '28px', fontWeight: 400, verticalAlign: 'sub' }} >LOGIN</span>
                        </Radio>
                        <Divider type="vertical" style={{ height: 44}} />
                        <Radio value={2}>
                            <span style={{ fontSize: '28px', fontWeight: 400, verticalAlign: 'sub' }} >SIGN UP</span>
                        </Radio>
                        <Divider type="vertical" style={{ height: 44}} />
                    </Radio.Group>

                    <Card
                        style={{
                            boxShadow: '5px 10px #3438430a',
                            padding: '10px',
                        }}
                    >
                        {radioValue === 1 ? (
                            <FormWrapper
                                onFinish={onFinishLogin}
                                onFinishFailed={onFinishFailed}
                            >
                                <InputComponent
                                    label="Email"
                                    name="email"
                                    type="email"
                                    rules={ emailValidation('Please input your email!') }
                                />

                                <InputComponent
                                    label="Password"
                                    name="password"
                                    type="password"
                                    rules={ passwordValidation('Please input your password!') }
                                />

                                <ButtonComponent
                                    type="primary"
                                    htmlType="submit"
                                    buttontext="Enter"
                                    extramessage={errMessage}
                                />
                            </FormWrapper>
                        ) : (
                            <FormWrapper
                                onFinish={onFinishRegister}
                                onFinishFailed={onFinishFailed}
                            >
                                <InputComponent
                                    label="Email"
                                    name="email"
                                    type="email"
                                    rules={ emailValidation('Please input your email!') }
                                />
                                <InputComponent
                                    label="Username"
                                    name="username"
                                    type="text"
                                    rules={ usernameValidation('Please input your username!') }
                                />
                                <InputComponent
                                    label="Password"
                                    name="password"
                                    type="password"
                                    rules={ passwordValidation('Please input your password!') }
                                />

                                <ButtonComponent
                                    type="primary"
                                    htmlType="submit"
                                    buttontext="Join"
                                    extramessage={errMessage}
                                />
                            </FormWrapper>
                        )}
                    </Card>
                </>
            </AuthWrapper>
        </>
    )
}

export default Auth;

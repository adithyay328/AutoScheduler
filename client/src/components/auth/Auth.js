import AuthWrapper from '../base/wrappers/AuthWrapper'
import Header from '../atoms/Header'
import { Form } from 'antd'
import ButtonComponent from '../atoms/ButtonComponent'
import InputComponent from '../atoms/InputComponent'
import emailValidation from '../../utils/validations/emailValidation'
import passwordValidation from '../../utils/validations/passwordValidation'

function Auth() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Header />
            <AuthWrapper>
                <Form
                    name="login"
                    layout="vertical"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
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
                        buttontext="Join"
                        extramessage="errorMessage"
                    />
                </Form>
            </AuthWrapper>
        </>
    )
}

export default Auth;
import AuthWrapper from '../base/wrappers/AuthWrapper'
import Header from '../atoms/Header'
import { Form, Input } from 'antd'
import ButtonComponent from '../atoms/ButtonComponent'
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
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={ emailValidation('Please input your email!') }
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={ passwordValidation('Please input your password!') }
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <ButtonComponent
                            type="primary"
                            htmlType="submit"
                            buttontext="Join"
                            extramessage="errorMessage"
                        />
                    </Form.Item>
                </Form>
            </AuthWrapper>
        </>
    )
}

export default Auth;
import { Button, Form, Typography } from 'antd'
import React from 'react'
import Paragraph from '../atoms/Paragraph'

const Text = Typography.Text;

const ButtonComponent = (props) => {
    const {
        buttontext = 'button',
        icon,
        htmlType = 'button',
        extramessage,
        onClick,
    } = props;
    return (
        <Form.Item
            extra={
                extramessage ? (
                    <Paragraph style={{color: '#ff4d4f'}} text={extramessage}></Paragraph>
                ) : null
            }
        >
            <Button
                type="primary"
                icon={icon}
                onClick={onClick}
                htmlType={htmlType}
                shape="round"
                style={{height: 48, width: '100%', color: 'white'}}
                {...props}
            >
                {
                    <Text style={{color: 'white', fontSize: 24, lineHeight: "24px", fontWeight: 500}}>
                        {buttontext}
                    </Text>
                }
            </Button>
        </Form.Item>
    );
};

export default ButtonComponent;

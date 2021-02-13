import { Form, Row } from 'antd';
import React from 'react';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const {
        onFinish,
        children,
        layoutPosition = 'vertical',
        onFinishFailed,
        outForm
    } = props;
    const layout =
        layoutPosition === 'horizontal'
            ? {
                  labelCol: {
                      span: 4,
                  },
                  wrapperCol: {
                      span: 14,
                  },
              }
            : {
                  labelCol: { span: 24 },
              };
    return (
        <Row justify="start">
            <Form
                {...layout}
                layout={layoutPosition}
                form={outForm ? outForm : form}
                name="form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ width: '100%' }}
            >
                {children}
            </Form>
        </Row>
    );
};

export default FormWrapper;

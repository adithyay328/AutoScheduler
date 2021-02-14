import React from 'react';
import { Form, Input } from 'antd';
import Paragraph from '../atoms/Paragraph';

const { Item } = Form;

const InputComponent = (props) => {
    const {
        label,
        name,
        type = 'text',
        initialValue,
        dependencies = [],
        rules = [],
        extramessage = '',
        onChange,
        ...rest
    } = props;
    return (
        <>
            <Item
                label={
                    label ? <Paragraph style={{color: '#595959'}} text={label} strong /> : null
                }
                name={name}
                initialValue={initialValue}
                dependencies={dependencies}
                rules={rules}
                extra={
                    <span
                        text={extramessage}
                    ></span>
                }
            >
                <Input
                    type={type}
                    onChange={onChange}
                    {...rest}
                    style={{backgroundColor: '#F4F4F4', fontSize: '16px'}}
                />
            </Item>
        </>
    );
};

export default InputComponent;

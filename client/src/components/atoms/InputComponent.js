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
                label={label ? <Paragraph text={label} strong /> : null}
                name={name}
                initialValue={initialValue}
                dependencies={dependencies}
                rules={rules}
                extra={
                    <Paragraph
                        text={extramessage}
                        className="extramessage-text"
                    ></Paragraph>
                }
            >
                <Input
                    type={type}
                    placeholder="Type.."
                    className="input-component"
                    onChange={onChange}
                    {...rest}
                />
            </Item>
        </>
    );
};

export default InputComponent;

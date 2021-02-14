import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import Paragraph from '../../../atoms/Paragraph';

const { Item } = Form;

const NumberInput = (props) => {
    const {
        label,
        name,
        type = 'text',
        initialValue,
        dependencies = [],
        rules = [],
        extramessage = '',
        onChange,
        width,
        marginBottom,
        defValue
    } = props;
    return (
        <>
            <Item
                label={
                    label ? <Paragraph style={{color: '#595959'}} text={label} strong /> : null
                }
                name={name}
                initialValue={initialValue}
            >
                <InputNumber
                    defaultValue={defValue}
                    formatter={value => `${value}`}
                    onChange={onChange}
                    style={{backgroundColor: '#F4F4F4', fontSize: '16px', width: width, marginBottom: marginBottom}}
                />
            </Item>
        </>
    );
};

export default NumberInput;

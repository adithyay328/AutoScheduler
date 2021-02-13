import { Typography } from 'antd';
import React from 'react';

const Text = Typography.Text;

const Paragraph = (props) => {
    return (
        <Text {...props}>
            {props.text}
        </Text>
    );
};

export default Paragraph;

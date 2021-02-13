import { RuleObject } from 'antd/lib/form';
import React from 'react';
import { emailRegExp } from '../../components/enums/regExp';

export const emailValidation = (rulesMessage) => [
    {
        required: true,
        message: <p>{rulesMessage}</p>,
    },
    () => ({
        validator(rule, value) {
            if (!value || emailRegExp.test(value)) return Promise.resolve();
            return Promise.reject(
                <p>Invalid Email</p>
            );
        },
    }),
];

export default emailValidation;

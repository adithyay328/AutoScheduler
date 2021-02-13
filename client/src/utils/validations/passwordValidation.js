import { RuleObject } from 'antd/lib/form';
import React from 'react';
import { passwordRegExp } from '../../components/enums/regExp';

export const passwordValidation = (rulesMessage) => [
    {
        required: true,
        message: <p>{rulesMessage}</p>,
    },
    () => ({
        validator(rule, value) {
            if (!value || passwordRegExp.test(value)) return Promise.resolve();
            return Promise.reject(
                <p>The password must have 8-128 chars (capital letter must contain a digit)</p>
            );
        },
    }),
];

export default passwordValidation;

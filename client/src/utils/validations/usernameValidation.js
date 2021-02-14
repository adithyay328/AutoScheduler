import React from 'react';
import { usernameRegExp } from '../../components/enums/regExp';

export const usernameValidation = (rulesMessage) => [
    {
        required: true,
        message: <p>{rulesMessage}</p>,
    },
    () => ({
        validator(rule, value) {
            if (!value || usernameRegExp.test(value)) return Promise.resolve();
            return Promise.reject(
                <p>Invalid username</p>
            );
        },
    }),
];

export default usernameValidation;

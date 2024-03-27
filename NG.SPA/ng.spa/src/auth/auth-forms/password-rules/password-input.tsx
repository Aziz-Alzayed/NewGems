import React from 'react';
import { Form, Input } from 'antd';
import { Rule } from 'rc-field-form/lib/interface';

interface PasswordRulesType {
    RequireDigit: boolean;
    RequireLowercase: boolean;
    RequireNonAlphanumeric: boolean;
    RequireUppercase: boolean;
    RequiredLength: number;
    RequiredUniqueChars: number;
}

// Simulate the PasswordRules coming from your backend or config
const PasswordRules: PasswordRulesType = {
    RequireDigit: true,
    RequireLowercase: true,
    RequireNonAlphanumeric: true,
    RequireUppercase: true,
    RequiredLength: 8,
    RequiredUniqueChars: 2, // Implementing this in UI validation is complex and might not be exact
};

const PasswordInput: React.FC = () => {
    // An array of validation rules
    const validationRules: Rule[] = [
        { required: true, message: 'Please input your password!' },
        { min: PasswordRules.RequiredLength, message: `Password must be at least ${PasswordRules.RequiredLength} characters long!` },
        {
            validator: (_, value) =>
                PasswordRules.RequireDigit && value && !/[0-9]/.test(value) ?
                    Promise.reject(new Error('Password must contain at least one digit!')) :
                    Promise.resolve(),
        },
        {
            validator: (_, value) =>
                PasswordRules.RequireLowercase && value && !/[a-z]/.test(value) ?
                    Promise.reject(new Error('Password must contain at least one lowercase letter!')) :
                    Promise.resolve(),
        },
        {
            validator: (_, value) =>
                PasswordRules.RequireUppercase && value && !/[A-Z]/.test(value) ?
                    Promise.reject(new Error('Password must contain at least one uppercase letter!')) :
                    Promise.resolve(),
        },
        {
            validator: (_, value) =>
                PasswordRules.RequireNonAlphanumeric && value && !/[^A-Za-z0-9]/.test(value) ?
                    Promise.reject(new Error('Password must contain at least one non-alphanumeric character!')) :
                    Promise.resolve(),
        },
        // Additional validators can be added here
    ];

    return (
        <Form.Item
            name="password"
            label="Password"
            rules={validationRules}
            hasFeedback
        >
            <Input.Password placeholder="Password" />
        </Form.Item>
    );
};

export default PasswordInput;

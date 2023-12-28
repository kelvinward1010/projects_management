"use client"

import { Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props{
    currentUser?: any;
    onClose?: any;
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
    },
};


interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    onSubmit: (data: any) => void;
    onFailure: (data: any) => void;
}

const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields, onFailure, onSubmit }) => (
    <Form
        name="profilechangepassword"
        fields={fields}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
        }}
        {...formItemLayout}
        onFinish={onSubmit}
        onFinishFailed={onFailure}
        initialValues={{
            "old_password": "",
            "new_password": "",
            "confirm_password": "",
        }}
    >
        <Form.Item
            name="old_password"
            label="Old Password"
            rules={[{ required: true, message: 'Old password is required!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            name="new_password"
            label="New Password"
            rules={[{ required: true, message: 'New password is required!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            name="confirm_password"
            label="Confirm Password"
            dependencies={['new_password']}
            hasFeedback
            rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('new_password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                }),
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 14 }}>
            <Button 
                htmlType="submit"
                className="
                    w-32
                    h-9
                    bg-sky-700
                    text-white
                    gap-2
                    rounded-md
                    shadow-lg
                    
                "
            >
                Update Password
            </Button>
        </Form.Item>
    </Form>
);


function ChangePassword({
    onClose
}:Props) {

    const [fields, setFields] = useState<FieldData[]>([
        {
            name: ['old_password'],
            value: '',
        },
        {
            name: ['new_password'],
            value: '',
        },
        {
            name: ['confirm_password'],
            value: '',
        }
    ]);

    const onFinish = (values: any) => {
        const data = {
            password: values?.old_password,
            newpassword: values?.new_password,
            isChangePassword: true
        }

        axios.post('/api/settings',data)
            .then(() => {
                onClose(false)
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Password has been updated!')
            });
    }

    const onFinishFailed = (errorInfo: any) => {
        toast.error('Something went wrong!', errorInfo)
    };

    return (
        <div className="w-full h-full">
            <CustomizedForm
                fields={fields}
                onChange={(newFields) => {
                    setFields(newFields);
                }}
                onFailure={(error: any) => onFinishFailed(error)}
                onSubmit={(values: any) => onFinish(values)}
            />
        </div>
    )
}

export default ChangePassword
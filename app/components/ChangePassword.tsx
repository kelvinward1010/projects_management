"use client"

import { Button, Form, Input } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props{
    currentUser?: any;
    onClose?: () => void;
}

function ChangePassword({
    currentUser,
    onClose
}:Props) {

    const router = useRouter();
    const [form] = Form.useForm();
    const password = form.getFieldValue('password');
    const newPassword = form.getFieldValue('newpassword');

    const onSubmit = () => {

        axios.post('/api/settings',{
            password: password,
            newpassword: newPassword,
            isChangePassword: true
        })
            .then(() => {
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Password has been updated!')
            });
    }

    return (
        <div className="w-full h-full">
            <Form
                form={form}
                style={{ maxWidth: 600 }}
                scrollToFirstError
                onFinish={onSubmit}
            >
                <Form.Item
                    name="password"
                    label="Old Password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                    hasFeedback
                >
                    <Input.Password 
                    />
                </Form.Item>
                <Form.Item
                    name="newpassword"
                    label="New Password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                    hasFeedback
                >
                    <Input.Password 
                    />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['newpassword']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('newpassword') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <button onClick={onClose} type={'submit'} className="
                    w-32
                    h-9
                    bg-sky-700
                    text-white
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-md
                    shadow-lg
                ">
                    Submit
                </button>
            </Form>
        </div>
    )
}

export default ChangePassword
"use client"
import { Flex, Typography } from 'antd';
import React from 'react'

import {
    FieldValues,
    UseFormRegister,
    FieldErrors
} from "react-hook-form" 


interface InputProps{
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
}

const { Title } = Typography;

function InputSettings({
    label,
    id,
    register,
    required,
    errors,
    type="text",
    disabled,
}:InputProps) {
  return (
    <>
        <Flex vertical>
            <Title level={5}>{label}</Title>
            <input
                placeholder='Title story...'
                type={type} 
                id={type}
                autoComplete={id}
                disabled={disabled}
                {...register(id, { required})}
                className='
                    border-2
                    border-sky-600
                    text-base
                    p-1
                    rounded
                '
            />
        </Flex>
    </>
  )
}

export default InputSettings
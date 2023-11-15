"use client"
import { Flex, Typography } from 'antd'

import {
    FieldValues,
    UseFormRegister,
    FieldErrors
} from "react-hook-form" 


interface InputProps{
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
}

const { Title } = Typography;

function TextareaEdit({
    id,
    register,
    required,
    errors,
    type="text",
    disabled,
}:InputProps) {
    return (
        <>
            <textarea
                placeholder='Description story...'
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
                    w-full
                '
            />
    </>
    )
}

export default TextareaEdit
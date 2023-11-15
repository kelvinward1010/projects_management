'use client'
import { Input } from "antd";
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from "react-hook-form";

interface InputProps {
    placeholder?: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
}

const { TextArea } = Input;


const InputEdit: React.FC<InputProps> = ({
    placeholder,
    id,
    type,
    register,
    required,
}) => {
    return (
        <>
            <input
                id={id}
                typeof={type}
                autoComplete={id}
                {...register(id, { required })}
                className="
                    border-2
                    border-teal-600
                    w-full
                    h-9
                    p-5
                    rounded
                    w-full
                "
                placeholder={placeholder}
            />
        </>
    )
}

export default InputEdit;
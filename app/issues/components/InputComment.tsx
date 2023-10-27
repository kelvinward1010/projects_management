'use client'
import { Input } from "antd";
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from "react-hook-form";

interface PostInputProps {
    placeholder?: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
}

const { TextArea } = Input;


const InputComment: React.FC<PostInputProps> = ({
    placeholder,
    id,
    type,
    register,
    required,
}) => {
    return (
        <>
            <TextArea
                id={id}
                typeof={type}
                autoComplete={id}
                {...register(id, { required })}
                className="
                    border-2
                    border-teal-600
                    text-xl
                "
                placeholder={placeholder}
                autoSize
            />
        </>
    )
}

export default InputComment;
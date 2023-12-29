'use client'

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


const InputComment: React.FC<PostInputProps> = ({
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
                "
                placeholder={placeholder}
            />
        </>
    )
}

export default InputComment;
"use client"

import Input from "@/app/components/inputs/Input"
import { useCallback, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import AuthButton from "./AuthButton";
import { BsGithub, BsGoogle } from 'react-icons/bs';

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {

    const [variant, setVariant] = useState<Variant>('REGISTER');
    const [isLoading, setIsloading] = useState(false);

    const handleToggleVariant = useCallback(() => {
        variant === 'LOGIN' ? setVariant('REGISTER') : setVariant('LOGIN');
    },[variant])

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            username: "",
            emeil: "",
            password: "",
        }
    })

    return (
        <div
            className="
                mt-8
                sm:mx-auto
                sm:w-full
                sm:max-w-full
            "
        >
            <div
                className="
                    px-4
                    py-8
                    w-6/7
                    shadow-md
                    sm:rounded-lg
                    sm:px-10
                "
            >
                <div
                    className="
                        bg-white
                        px-4
                        py-8
                        shadow
                        sm:rounded-lg
                        sm:px-10
                    "
                >
                    <form
                        className="space-y-6"
                    >
                        {variant === 'REGISTER' && 
                            <>
                                <Input 
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                    id="name"
                                    label="Name"
                                />
                                <Input 
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                    id="username"
                                    label="User Name"
                                />
                            </>
                        }
                        <Input 
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            id="email"
                            label="Email address"
                            type="email"
                        />
                        <Input
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            id="password"
                            label="Password"
                            type="password"
                        />
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div
                                className="
                                    absolute
                                    inset-0
                                    flex
                                    items-center
                                "
                            >
                                <div
                                    className="
                                        w-full
                                        border-t
                                        border-gray-300
                                    "
                                />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-2">
                            <AuthButton
                                icon={BsGithub}
                                onClick={() => {}}
                            />
                            <AuthButton
                                icon={BsGoogle}
                                onClick={() => {}}
                            />
                        </div>
                    </div>

                    <div
                        className="
                            flex
                            gap-2
                            justify-center
                            text-sm
                            mt-6
                            px-2
                            text-gray-500
                        "
                    >
                        <div>
                            {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
                        </div>
                        <div
                            onClick={handleToggleVariant}
                            className="underline cursor-pointer"
                        >
                            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm
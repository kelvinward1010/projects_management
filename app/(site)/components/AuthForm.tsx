"use client"

import Input from "@/app/components/inputs/Input"
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthButton from "./AuthIcon";
import { BsGithub, BsGoogle } from 'react-icons/bs';
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "@/app/components/buttons/Button";
import useCurrentUser from "@/app/hooks/useCurrentUser";

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {

    const session = useSession();
    const router = useRouter();

    const [variant, setVariant] = useState<Variant>('REGISTER');
    const [isLoading, setIsloading] = useState(false);
    const [isOk, setIsOk] = useState(false);

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
            name_Id: "",
            email: "",
            password: "",
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsloading(true);

        if(variant === 'REGISTER'){
            axios.post('/api/register', data)
                .then(() => signIn('credentials', {
                    ...data,
                    redirect: false,
                }))
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('Invalid credentials!');
                    }
            
                    if (callback?.ok) {
                        toast.success("Logged In")
                    }
                })
                .catch(() => toast.error("Something went wrong!"))
                .finally(() => {
                    setIsOk(true)
                    setIsloading(false)
                });
        }

        if(variant === 'LOGIN'){
            
            signIn("credentials", {
                ...data,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error("Invalid credentials")
                    }

                    if (callback?.ok && !callback?.error) {
                        toast.success("Logged In")
                    }
                })
                .finally(() => {
                    setIsOk(true)
                    setIsloading(false)
                })
        }
    }

    const onSocialAction = (action: string) => {
        setIsloading(true)

        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid credentials')
                }

                if (callback?.ok) {
                    toast.success("Logged In")
                }
            })
            .finally(() => {
                setIsOk(true)
                setIsloading(false)
            })
    }

    const checkAdmin = useCurrentUser()?.data;
    useEffect(() => {
        if (session?.status === 'authenticated' && checkAdmin?.isAdmin === null) {
            router.push('/home');
            router?.refresh();
        }else if (session?.status === 'authenticated' && checkAdmin?.isAdmin === true) {
            router.push('/manageddata');
            router?.refresh();
        }
    }, [session?.status, router, checkAdmin]);

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
                        onSubmit={handleSubmit(onSubmit)}
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
                                    id="name_Id"
                                    label="Name ID"
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
                        <div>
                            <Button
                                disabled={isLoading}
                                fullWidth
                                type="submit"
                            >
                                {variant === 'LOGIN' ? 'Sign In' : 'Register'}
                            </Button>
                        </div>
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
                                onClick={() => onSocialAction('github')}
                            />
                            <AuthButton
                                icon={BsGoogle}
                                onClick={() => onSocialAction('google')}
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
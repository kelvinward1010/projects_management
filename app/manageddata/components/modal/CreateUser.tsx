"use client"

import Input from "@/app/components/inputs/Input";
import useUsers from "@/app/hooks/useUsers";
import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Modal, Typography } from "antd";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";

const {Title, Text} = Typography;

function CreateUser() {

    const [isLoading, setIsloading] = useState(false);
    const [isModalOpenCreateUser, setIsModalOpenCreateUser] = useState(false);
    const {mutate: mutateUsers} = useUsers();

    const {
        register,
        setValue,
        watch,
        reset,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            name_Id: '',
            image: '',
            email: '',
            password: '',
        }
    });

    const image = watch('image');
    const name_Id = watch('name_Id');
    const name = watch('name');
    const email = watch('email');
    const password = watch('password');
    
    const handleUpload = (result: any) => {
        setValue('image', result.info.secure_url, {
            shouldValidate: true
        });
    }
    const onSubmit = () => {
        setIsloading(true);
        axios.post('/api/register',{
            name: name,
            name_Id: name_Id,
            image: image,
            email: email,
            password: password,
        })
            .then(() => {
                mutateUsers()
            })
            .catch(() => toast.error("Something went wrong!"))
            .finally(() => {
                setIsloading(false)
                toast.success("User has been created!")
            });
    }

    return (
        <>
            <button
                className="
                    w-40
                    h-9
                    bg-sky-700
                    text-white
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-md
                    shadow-lg
                    mr-5
                "
                onClick={()=>setIsModalOpenCreateUser(true)}
            >
                <UserAddOutlined />
                Create User
            </button>
            <Modal
                title="Created User" 
                open={isModalOpenCreateUser} 
                onCancel={() =>setIsModalOpenCreateUser(false)}
                className="modal-edit w-full"
                width={900}
            >
                <div className='
                    my-2
                    py-2
                    h-fit
                    w-full
                    border-4
                    border-sky-600
                    flex
                    items-center
                    justify-between
                '>
                    <div className='px-2 w-full'>
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
                        <div className="mt-5 gap-x-3">
                            <Title level={5}>Avatar</Title>
                            <div className='flex items-center gap-x-5'>
                                {image && <Avatar size={'large'} src={image}/>}
                                <CldUploadButton
                                    options={{ maxFiles: 1 }}
                                    onUpload={handleUpload}
                                    uploadPreset="jucsyqyi"
                                >
                                    <div className='text-md flex justify-center items-center gap-4'> 
                                        <span className='text-xl'>
                                            <AiOutlineCloudUpload/>
                                        </span>
                                        Upload Image
                                    </div>
                                </CldUploadButton>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={onSubmit} className="
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
                    mt-5
                ">
                    Submit
                </button>
            </Modal>
        </>
    )
}

export default CreateUser
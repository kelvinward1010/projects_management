"use client"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import InputScheduleConversation from './InputScheduleConversation'
import { CldUploadButton } from 'next-cloudinary';
import { Projects } from '@prisma/client';
import { PaperClipOutlined, SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Props {
    project?: Projects;
}

function FormConversationInProject({
    project
}:Props) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            content: '',
            image: '',
        }
    });

    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image', result.info.secure_url, {
            shouldValidate: true
        });
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/schedules', {
            ...data,
            projectId: project?.id
        })
            .then(() => {
                router.refresh();
                reset();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Schedule conversation has been created!')
            });
    }

    //console.log(project)

    return (
        <>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-5 flex justify-between items-center gap-x-2">
                    <div className="mt-2 flex items-center gap-x-3">
                        <CldUploadButton
                            options={{ maxFiles: 1 }}
                            onUpload={handleUpload}
                            uploadPreset="jucsyqyi"
                        >
                            <div className='text-4xl text-sky-500 flex justify-center items-center gap-4'> 
                                <PaperClipOutlined />
                            </div>
                        </CldUploadButton>
                    </div>
                    <InputScheduleConversation
                        id="content"
                        register={register}
                        errors={errors}
                        required
                        placeholder={"Writing your schedule ..."}
                    />
                    <button type={'submit'}>
                        <SendOutlined className='text-4xl text-teal-600' />
                    </button>
                </div>
            </form>
        </>
    )
}

export default FormConversationInProject
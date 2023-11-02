"use client"
import { FieldValues, useForm } from 'react-hook-form';
import InputScheduleConversation from './InputScheduleConversation'
import { CldUploadButton } from 'next-cloudinary';
import { Projects } from '@prisma/client';
import { PaperClipOutlined, SendOutlined } from '@ant-design/icons';

interface Props {
    project?: Projects;
}

function FormConversationInProject({
    project
}:Props) {

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

    return (
        <>
            <form className="w-full" onSubmit={() =>{}}>
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
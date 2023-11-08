'use client';

import axios from 'axios';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import { Projects } from '@prisma/client';

import { toast } from 'react-hot-toast';
import Modal from '@/app/components/modals/Modal';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/buttons/Button';
import SelectTask from '../input/Select';
import { optionsStatus } from '@/app/config/options';

interface Props {
    isOpen?: boolean;
    onClose: () => void;
    project: Projects;
}

const CreateEpicModel: React.FC<Props> = ({
    isOpen,
    onClose,
    project
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            title: '',
            status: '',
        }
    });

    const status = watch('status');

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/epics', {
            ...data,
            projectId: project?.id
        })
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Epic has been created!')
            });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2
                            className="
                                text-base 
                                font-semibold 
                                leading-7 
                                text-gray-900
                            "
                        >
                            Create a Epic
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Create a epic with status.
                        </p>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input
                                disabled={isLoading}
                                label="Title"
                                id="title"
                                errors={errors}
                                required
                                register={register}
                            />
                            <SelectTask
                                onChange={(value) => setValue('status', value)}
                                options={optionsStatus}
                                value={status}
                                label='Status'
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button
                        disabled={isLoading}
                        onClick={onClose}
                        type="button"
                        secondary
                    >
                        Cancel
                    </Button>
                    <Button disabled={isLoading} type="submit">
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default CreateEpicModel;
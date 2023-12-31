'use client';

import axios from 'axios';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import { User } from '@prisma/client';

import { toast } from 'react-hot-toast';
import Modal from '@/app/components/modals/Modal';
import Input from '@/app/components/inputs/Input';
import SelectConFig from '@/app/components/inputs/SelectConFig';
import Button from '@/app/components/buttons/Button';
import { DatePicker, Flex, Typography } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import useGetAllProject from '@/app/hooks/useGetAllProject';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';
dayjs.extend(customParseFormat);

interface Props {
    isOpen?: boolean;
    onClose: () => void;
    users: User[];
}

const CreateModal: React.FC<Props> = ({
    isOpen,
    onClose,
    users = []
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: mutateProjects } = useGetAllProject()

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
            title: '',
            members: [],
            timework: [],
        }
    });

    const members = watch('members');
    const title = watch('title');
    const timework = watch('timework');

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if(members.length > 1) {
            axios.post('/api/projects', {
                ...data,
                isGroup: true
            })
                .then(() => {
                    router.refresh();
                    mutateProjects();
                    onClose();
                    reset();
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => {
                    setIsLoading(false);
                    toast.success('Project has been created!')
                });
        }else{
            axios.post('/api/projects', {
                title: title,
                userId: members[0]?.value,
                isGroup: false,
            })
                .then(() => {
                    router.refresh();
                    onClose();
                    reset();
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => {
                    setIsLoading(false);
                    toast.success('Project has been created!')
                });
        }
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
                            Create a project
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Create a project with more than 2 people.
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
                            <Flex vertical>
                                <Title level={5}>Time Project:</Title>
                                <RangePicker 
                                    showTime 
                                    onChange={(value) => setValue('timework', value)}
                                    format={dateFormat}
                                    value={timework}
                                />
                            </Flex>
                            <SelectConFig
                                disabled={isLoading}
                                label="Members"
                                options={users.map((user) => ({
                                    value: user?.id,
                                    label: user?.name
                                }))}
                                onChange={(value) => setValue('members', value, {
                                    shouldValidate: true
                                })}
                                value={members}
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

export default CreateModal;
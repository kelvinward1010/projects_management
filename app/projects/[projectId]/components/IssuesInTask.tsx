"use client"
import React, { useState } from 'react'
import HeaderProjects from '../../components/HeaderProjects';
import { Tasks } from '@prisma/client';
import IssuesList from './IssuesList';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Col, Flex, Row, Select, Typography } from 'antd';
import { optionsStatus } from '@/app/config/options';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from '@/app/components/buttons/Button';
import InputIssues from '../input/InputIssues';
import TextareaIssues from '../input/TextareaIssues';
import { dataTaskId } from '@/app/config/data';
import useIssues from '@/app/hooks/useIssues';

interface Props {
    title?: string | null;
    task?: any;
    listIssues?: any;
}

const { Title } = Typography;

function IssuesInTask({
    title,
    task,
    listIssues
}:Props) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModalCreate = () => setIsModalOpen(!isModalOpen);

    const {mutate: mutateIssues } = useIssues(task?.id as string);

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
            desc: '',
            status: '',
        }
    });

    const status = watch('status');

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/issues', {
            ...data,
            taskId: task?.id
        })
            .then(() => {
                router.refresh();
                mutateIssues()
                setIsModalOpen(false);
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Issues has been created!')
            });
    }

    return (
        <div>
            <HeaderProjects 
                create={handleOpenModalCreate} 
                title={title}
            />
            {isModalOpen && (
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
                    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                        <div className='px-2'>
                            <Title level={4}>Create a issues in Task</Title>
                            <div className='mt-5'>
                                <Row justify={'space-between'} style={{width:'100%'}}>
                                    <Col span={13}>
                                        <InputIssues
                                            disabled={isLoading}
                                            label="Title"
                                            id="title"
                                            errors={errors}
                                            required
                                            register={register}
                                        />
                                    </Col>
                                    <Col span={7}>
                                        <Flex vertical>
                                            <Title level={5}>Status issues</Title>
                                            <Select
                                                disabled={isLoading}
                                                onChange={(value) => setValue('status', value)}
                                                style={{ width: "100%" }}
                                                options={optionsStatus}
                                                value={status}
                                            />
                                        </Flex>
                                    </Col>
                                </Row>
                                <Row className='mt-4'>
                                    <Col span={24}>
                                        <TextareaIssues
                                            disabled={isLoading}
                                            label="Description"
                                            id="desc"
                                            errors={errors}
                                            required
                                            register={register}
                                        />
                                    </Col>
                                </Row>
                                <Row className='mt-5'>
                                    <Col span={24}>
                                        <Flex className='gap-x-2' align={'center'} justify={'flex-end'}>
                                            <Button
                                                disabled={isLoading}
                                                onClick={() => setIsModalOpen(false)}
                                                type="button"
                                                secondary
                                            >
                                                Cancel
                                            </Button>
                                            <Button disabled={isLoading} type="submit">
                                                Create
                                            </Button>
                                        </Flex>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            <IssuesList task={task} listIssues={listIssues}/>
        </div>
    )
}

export default IssuesInTask
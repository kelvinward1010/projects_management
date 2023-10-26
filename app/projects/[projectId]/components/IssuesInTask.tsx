"use client"
import React, { useState } from 'react'
import HeaderProjects from '../../components/HeaderProjects';
import { Tasks } from '@prisma/client';
import IssuesList from './IssuesList';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, Col, Flex, Input, Row, Select, Typography } from 'antd';
import { optionsStatus } from '@/app/config/options';

interface Props {
    title?: string | null;
    task?: Tasks;
}

const { Title } = Typography;
const { TextArea } = Input;

function IssuesInTask({
    title,
    task
}:Props) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModalCreate = () => setIsModalOpen(!isModalOpen);

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
                    <form className='w-full'>
                        <div className='px-2'>
                            <Title level={4}>Create a issues in Task</Title>
                            <div className='mt-5'>
                                <Row justify={'space-between'} style={{width:'100%'}}>
                                    <Col span={13}>
                                        <Flex vertical>
                                            <Title level={5}>Title issues</Title>
                                            <Input
                                                disabled={isLoading}
                                                placeholder='Title issues...'
                                                id='title'
                                                required
                                            />
                                        </Flex>
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
                                        <Flex vertical>
                                            <Title level={5}>Description issues</Title>
                                            <TextArea 
                                                disabled={isLoading}
                                                rows={4} 
                                                placeholder="Description issues here..."
                                                maxLength={6}
                                                id='desc' 
                                            />
                                        </Flex>
                                    </Col>
                                </Row>
                                <Row className='mt-5'>
                                    <Col span={24}>
                                        <Flex className='gap-x-2' align={'center'} justify={'flex-end'}>
                                            <Button 
                                                type="primary"
                                                danger
                                                onClick={() => setIsModalOpen(false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button 
                                                type="primary"
                                                className='bg-sky-600'
                                                onClick={() => console.log("???")}
                                            >
                                                Save
                                            </Button>
                                        </Flex>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            <div className='mt-5'>
                <IssuesList />
            </div>
        </div>
    )
}

export default IssuesInTask
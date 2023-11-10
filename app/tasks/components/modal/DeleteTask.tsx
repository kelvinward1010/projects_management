"use client"
import Button from '@/app/components/buttons/Button'
import { WarningOutlined } from '@ant-design/icons'
import { Col, Row, Typography } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

const { Title, Text } = Typography;

interface ConfirmModalProps {
    onClose: () => void;
    task?: any;
}

function DeleteTask({
    onClose,
    task
}:ConfirmModalProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = useCallback(() => {
        setIsLoading(true);

        axios.delete(`/api/tasks/${task?.id}`)
            .then(() => {
                onClose();
                router.push(`/storys/${task?.storyId}`);
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false)
                toast.success('Task has been deleted!')
            })
    },[router, task?.id, onClose]);

    return (
        <>
            <div className="w-full mt-12">
                <Row justify={'center'} className='gap-x-5 items-center'>
                    <Col span={2}>
                        <WarningOutlined className='text-4xl text-orange-600'/>
                    </Col>
                    <Col span={5}>
                        <Title level={5}>Delete Task</Title>
                    </Col>
                </Row>
            </div>
            <div className="w-full flex justify-center items-center mt-5">
                <Button
                    disabled={isLoading}
                    danger
                    onClick={handleDelete}
                >
                    Delete
                </Button>
                <Button
                    disabled={isLoading}
                    secondary
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>
        </>
    )
}

export default DeleteTask
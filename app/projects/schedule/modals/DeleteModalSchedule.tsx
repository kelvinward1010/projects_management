'use client';

import React, { useCallback, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Button from '@/app/components/buttons/Button';
import { Col, Row, Typography } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface ConfirmModalProps {
    onClose: () => void;
    scheduleId?: string;
}

const DeleteModalSchedule: React.FC<ConfirmModalProps> = ({
    onClose,
    scheduleId
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = useCallback(() => {
        setIsLoading(true);

        axios.delete(`/api/schedules/${scheduleId}`)
            .then(() => {
                onClose();
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false)
                toast.success('Schedule has been deleted!')
            })
    },[router, scheduleId, onClose]);

    return (
        <>
            <div className="w-full mt-12">
                <Row justify={'center'} className='gap-x-5 items-center'>
                    <Col span={2}>
                        <WarningOutlined className='text-4xl text-orange-600'/>
                    </Col>
                    <Col span={15}>
                        <Title level={5}>Delete Schedule Conversation</Title>
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

export default DeleteModalSchedule;
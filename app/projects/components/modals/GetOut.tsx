"use client"

import Button from "@/app/components/buttons/Button";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { WarningOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

const {Title} = Typography;

interface Props{
    project?: any;
    onClose?: () => void;
}

function GetOut({
    project,
    onClose
}:Props) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const currentUser = useCurrentUser()?.data
    const handleDelete = useCallback(() => {
        setIsLoading(true);
        axios.post(`/api/projects/${project?.id}`, {
            userId: currentUser?.id,
            kickout: true,
        })
            .then(() => {
                router.push('/projects')
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('You have been get out of project!')
            });
    },[router, project?.id, onClose]);

    return (
        <>
            <div className="w-full mt-12">
                <Row justify={'center'} className='gap-x-5 items-center'>
                    <Col span={2}>
                        <WarningOutlined className='text-4xl text-orange-600'/>
                    </Col>
                    <Col span={5}>
                        <Title level={5}>Are you sure to get out of this project?</Title>
                    </Col>
                </Row>
            </div>
            <div className="w-full flex justify-center items-center mt-5">
                <Button
                    disabled={isLoading}
                    danger
                    onClick={handleDelete}
                >
                    Get out
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

export default GetOut
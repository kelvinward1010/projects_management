"use client"
import { PieChartOutlined } from '@ant-design/icons';
import { Modal, Typography } from 'antd';
import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import ChartPieProject from './charts/ChartPieProject';

const { Title } = Typography;

interface Props {
    title?: string;
    hadleDelete?: () => void;
    project?: any
}

function HeaderTop({
    title,
    hadleDelete,
    project
}: Props) {
    const [isModalOpenChartPie, setIsModalOpenChartPie] = useState(false);
    
    return (
        <>
            <div
                className='
                h-16
                w-full
                flex
                justify-between
                p-5
                items-center
            '
            >
                <Title level={2}>{title}</Title>
                <div className='flex items-center justify-center'>
                    <div className='mx-5'>
                        <button
                            className="
                                w-52
                                h-9
                                bg-sky-700
                                text-white
                                flex
                                items-center
                                justify-center
                                gap-2
                                rounded-md
                                shadow-lg
                            "
                            onClick={()=>setIsModalOpenChartPie(true)}
                        >
                            <PieChartOutlined />
                            Chart
                        </button>
                        <Modal 
                            title={`Chart for project: ${project?.title}`} 
                            open={isModalOpenChartPie} 
                            onCancel={() => setIsModalOpenChartPie(false)}
                            className="modal-edit"
                            width={1400}
                        >
                            <ChartPieProject project={project}/>
                        </Modal>
                    </div>
                    <button
                        className="
                        w-52
                        h-9
                        bg-red-500
                        text-white
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-md
                        shadow-lg
                    "
                        onClick={hadleDelete}
                    >
                        <AiOutlineDelete />
                        Delete
                    </button>
                </div>
            </div>
        </>
    )
}

export default HeaderTop
"use client"
import { PieChartOutlined } from '@ant-design/icons';
import { Modal, Typography } from 'antd';
import React, { useState } from 'react'
import { AiOutlineFileAdd } from 'react-icons/ai'
import ChartTask from './chart/ChartTask';

const { Title } = Typography;

interface Props {
    title?: string | null;
    create?: () => void;
    tasks?: any;
    listIssues?: any;
}

function HeaderInTask({
    title,
    create,
    tasks
}: Props) {

    const [isModalOpenChartPie, setIsModalOpenChartPie] = useState(false);

    return (
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
            <Title level={5}>Task: {title}</Title>
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
                        Pie chart
                    </button>
                    <Modal 
                        title={`Pie chart for task: ${tasks?.title}`} 
                        open={isModalOpenChartPie} 
                        onCancel={() => setIsModalOpenChartPie(false)}
                        className="modal-edit"
                        width={1200}
                    >
                        <ChartTask task={tasks}/>
                    </Modal>
                </div>
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
                    onClick={create}
                >
                    <AiOutlineFileAdd />
                    Create
                </button>
            </div>
        </div>
    )
}

export default HeaderInTask
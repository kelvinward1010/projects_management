"use client"
import { PieChartOutlined } from '@ant-design/icons';
import { Modal, Typography } from 'antd';
import React, { useState } from 'react'
import { AiOutlineFileAdd } from 'react-icons/ai'
import ChartPieProjects from './charts/ChartPieProjects';

const { Title } = Typography;

interface Props {
  title?: string | null;
  create?: () => void;
  projects?: any;
}

function HeaderProjects({
    title,
    create,
    projects
}:Props) {

    const [isModalOpenCharts, setIsModalOpenCharts] = useState(false);
    
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
            <Title level={3}>{title}</Title>
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
                        onClick={()=>setIsModalOpenCharts(true)}
                    >
                        <PieChartOutlined />
                        Charts
                    </button>
                    <Modal 
                        title={`Chart for all projects`} 
                        open={isModalOpenCharts} 
                        onCancel={() => setIsModalOpenCharts(false)}
                        className="modal-edit"
                        width={1400}
                    >
                        <ChartPieProjects  projects={projects}/>
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

export default HeaderProjects
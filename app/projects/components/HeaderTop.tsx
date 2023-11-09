"use client"
import { PieChartOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Modal, Typography } from 'antd';
import React, { useState } from 'react'
import { AiFillSchedule, AiOutlineDelete, AiOutlineIssuesClose } from 'react-icons/ai';
import ChartPieProject from './charts/ChartPieProject';
import ScheduleProject from '../schedule/ScheduleProject';
import BodyMembers from './BodyMembers';
import BodyStorys from './BodyStorys';

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
    const [isModalOpenSchedule, setIsModalOpenSchedule] = useState(false);
    const [isModalOpenAllStorys, setIsModalOpenAllStorys] = useState(false);
    const [isModalOpenMembers, setIsModalOpenMembers] = useState(false);
    
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
                <div className='mx-2'>
                        <button
                            className="
                                w-36
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
                            onClick={()=>setIsModalOpenMembers(true)}
                        >
                            <UserSwitchOutlined />
                            Members
                        </button>
                        <Modal
                            title="Members"
                            open={isModalOpenMembers} 
                            onCancel={() => setIsModalOpenMembers(false)}
                            className="modal-edit"
                            width={1400}
                        >
                            <BodyMembers project={project}/>
                        </Modal>
                    </div>
                    <div className='mx-2'>
                        <button
                            className="
                                w-56
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
                            onClick={()=>setIsModalOpenSchedule(true)}
                        >
                            <AiFillSchedule />
                            Schedule Conversation
                        </button>
                        <Modal
                            open={isModalOpenSchedule} 
                            onCancel={() => setIsModalOpenSchedule(false)}
                            className="modal-edit"
                            width={1400}
                            style={{top: '15px'}}
                        >
                            <ScheduleProject project={project} />
                        </Modal>
                    </div>
                    <div className='mx-2'>
                        <button
                            className="
                                w-32
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
                            onClick={()=>setIsModalOpenAllStorys(true)}
                        >
                            <AiOutlineIssuesClose />
                            Story
                        </button>
                        <Modal 
                            title={`All Story in: ${project?.title}`} 
                            open={isModalOpenAllStorys} 
                            onCancel={() => setIsModalOpenAllStorys(false)}
                            className="modal-edit"
                            width={1400}
                            style={{top: '15px'}}
                        >
                            <BodyStorys project={project} />
                        </Modal>
                    </div>
                    <div className='mx-2'>
                        <button
                            className="
                                w-32
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
                            w-32
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
"use client"
import { PartitionOutlined, PieChartOutlined, SettingOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Dropdown, Modal, Typography } from 'antd';
import React, { useState } from 'react'
import { AiFillSchedule, AiOutlineDelete, AiOutlineIssuesClose } from 'react-icons/ai';
import ChartPieEpicsInProject from './charts/ChartPieEpicsInProject';
import ScheduleProject from '../schedule/ScheduleProject';
import BodyMembers from './BodyMembers';
import BodyStorys from './BodyStorys';
import useCurrentUser from '@/app/hooks/useCurrentUser';
import BodySettings from './BodySettings';
import GetOut from './modals/GetOut';
import ChartPieStorysInProject from './charts/ChartPieStorysInProject';
import MainPage from './reactflow/MainPage';
import useProject from '@/app/hooks/useProject';
import BodyYourDuties from './BodyYourDuties';

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
    const currentUser = useCurrentUser().data;
    const [openActions, setOpenActions] = useState(false);
    const [isModalOpenChartPie, setIsModalOpenChartPie] = useState(false);
    const [isModalOpenFlows, setIsModalOpenFlows] = useState(false);
    const [isModalOpenSchedule, setIsModalOpenSchedule] = useState(false);
    const [isModalOpenAllStorys, setIsModalOpenAllStorys] = useState(false);
    const [isModalOpenMembers, setIsModalOpenMembers] = useState(false);
    const [isModalOpenSettings, setIsModalOpenSettings] = useState(false);
    const [isModalOpenGetOut, setIsModalOpenGetOut] = useState(false);
    const [isModalOpenYourDuties, setIsModalOpenYourDuties] = useState(false);
    const {data: projectToRefesh} = useProject(project?.id)
    
    const items = [
        {
            label: <>
                <button
                    className="
                        w-48
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
                    onClick={()=>setIsModalOpenYourDuties(true)}
                >
                    <PieChartOutlined />
                    Your duties
                </button>
            </>,
            key: '0',
        },
        {
          label: <>
            <button
                className="
                    w-48
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
          </>,
          key: '1',
        },
        {
          label: <>
            <button
                className="
                    w-48
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
                Chart Pie
            </button>
          </>,
          key: '2',
        },
        {
            label: <>
              <button
                  className="
                      w-48
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
                  onClick={()=> {
                    setIsModalOpenFlows(true)
                }}
              >
                  <PieChartOutlined />
                  Flows Graph
              </button>
            </>,
            key: '3',
        },
        {
            label: <>
                {currentUser?.id !== project?.createdByWho ? (  
                <button
                    className="
                        w-48
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
                    onClick={() => setIsModalOpenGetOut(true)}
                >
                    <AiOutlineDelete />
                    Get out of project
                </button>
                ) : null}
            </>,
            key: '4',
        },
        {
            label: <>
                {currentUser?.id === project?.createdByWho ? (  
                <button
                    className="
                        w-48
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
                    onClick={() => setIsModalOpenSettings(true)}
                >
                    <PartitionOutlined />
                    Settings
                </button>
                ) : null}
            </>,
            key: '5',
        },
        {
            label: <>
                {currentUser?.id === project?.createdByWho ? (  
                <button
                    className="
                        w-48
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
                ) : null}
            </>,
            key: '6',
        },
    ];

    return (
        <>
            <Modal
                title="Your duties!"
                open={isModalOpenYourDuties} 
                onCancel={() => setIsModalOpenYourDuties(false)}
                className="modal-edit"
                width={1800}
            >
                <BodyYourDuties project={project}/>
            </Modal>
            <Modal
                title="Get out of this project!"
                open={isModalOpenGetOut} 
                onCancel={() => setIsModalOpenGetOut(false)}
                className="modal-edit"
            >
                <GetOut project={project} onClose={() => setIsModalOpenGetOut(false)}/>
            </Modal>
            <Modal
                title="Members"
                open={isModalOpenMembers} 
                onCancel={() => setIsModalOpenMembers(false)}
                className="modal-edit"
                width={1400}
            >
                <BodyMembers project={project}/>
            </Modal>
            <Modal 
                title={`Chart for project: ${project?.title}`} 
                open={isModalOpenChartPie} 
                onCancel={() => setIsModalOpenChartPie(false)}
                className="modal-edit"
                width={1400}
            >
                <ChartPieEpicsInProject project={project}/>
                <ChartPieStorysInProject project={project} />
            </Modal>
            <Modal
                title="Flows"
                open={isModalOpenFlows} 
                onCancel={() => setIsModalOpenFlows(false)}
                className="modal-edit"
                width={1700}
                style={{top: "5px"}}
            >
                <MainPage project={projectToRefesh}/>
            </Modal>
            <Modal 
                title={`Settings for project: ${project?.title}`} 
                open={isModalOpenSettings} 
                onCancel={() => setIsModalOpenSettings(false)}
                className="modal-edit"
                width={1400}
            >
                <BodySettings project={project}/>
            </Modal>
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
                            Stories
                        </button>
                        <Modal 
                            title={`All Story in: ${project?.title}`} 
                            open={isModalOpenAllStorys} 
                            onCancel={() => setIsModalOpenAllStorys(false)}
                            className="modal-edit"
                            width={1800}
                            style={{top: '15px'}}
                        >
                            <BodyStorys project={project} />
                        </Modal>
                    </div>
                    <div className='mx-2'>
                        <Dropdown
                            menu={{
                            items,
                            }}
                            trigger={['click']}
                        >
                            <SettingOutlined
                                className='
                                    w-12
                                    h-9
                                    bg-sky-700
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-md
                                    shadow-lg
                                    text-xl 
                                    cursor-pointer
                                '
                                onClick={() => setOpenActions(!openActions)}
                            />
                        </Dropdown>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderTop
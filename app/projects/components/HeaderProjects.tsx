"use client"
import { PieChartOutlined, SearchOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Select, Typography } from 'antd';
import React, { useState } from 'react'
import { AiOutlineFileAdd } from 'react-icons/ai'
import ChartPieProjects from './charts/ChartPieProjects';
import { optionsStatusProject } from '@/app/config/options';

const { Title } = Typography;

interface Props {
  title?: string | null;
  create?: () => void;
  projects?: any;
  setStatusProject?: any;
  chooseStatusProject?: any;
  setQueryNameProject?: any;
}

function HeaderProjects({
    title,
    create,
    projects,
    setStatusProject,
    chooseStatusProject,
    setQueryNameProject,
}:Props) {
    const [form] = Form.useForm();
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
                <Form
                    form={form}
                    layout={'inline'}
                    initialValues={{
                        status_project: "all",
                    }}
                    className='mb-1'
                >
                    <Form.Item label={'Search Project'} name={"search"}>
                        <Input
                            placeholder="Name project" 
                            onChange={(e) => setQueryNameProject(e.target.value)}
                            suffix={
                            <SearchOutlined
                                title="Search"
                            />
                            }
                        />
                    </Form.Item>
                    <Form.Item label={'Status Project'} name={"status_project"}>
                        <Select
                            onChange={(e) => setStatusProject(e)}
                            style={{ width: "100%", minWidth:'150px' }}
                            options={[
                                {
                                    label: "Tất cả",
                                    value: "all",
                                }
                                ,...optionsStatusProject,
                            ]}
                            value={chooseStatusProject}
                        />
                    </Form.Item>
                </Form>
                <div className='mx-5'>
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
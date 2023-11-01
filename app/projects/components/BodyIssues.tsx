import { optionsStatus } from '@/app/config/options';
import { takeDataIssues } from '@/app/equation';
import { Col, Input, Row, Select, Table, Typography } from 'antd';
import React from 'react';

const { Text, Title } = Typography;

interface Props {
    project?: any;
}

function BodyIssues({
    project
}: Props) {

    const data = takeDataIssues(project)

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
            width: '30%',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Task',
            dataIndex: 'Task',
            key: 'Task',
            width: '15%',
            render: (_: any, record: any) => {
                return (
                    <Text className='line-clamp-1'>{record?.task?.title}</Text>
                )
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '15%',
            render: (_: any, record: any) => {
                const style = record?.status === 'Done' ? 'green' : record?.status === 'Improgress' ? 'blue' : 'black';
                return (
                    <Text style={{color: `${style}`}} className='line-clamp-1'>{record?.status}</Text>
                )
            },
        },
        {
            title: 'Assigned To',
            dataIndex: 'assignto',
            key: 'assignto',
            width: '15%',
            render: (_: any, record: any) => {
                return (
                    <Text className='line-clamp-1'>{record?.assignto?.name}</Text>
                )
            },
        },
    ];

    return (
        <div className='w-full h-full'>
            <Row justify={'space-between'} className='my-5'>
                <Col span={8}>
                    <Title level={5}>Search</Title>
                    <Input placeholder="Name, task..." />
                </Col>
                <Col span={5}>
                    <Title level={5}>Status</Title>
                    <Select
                        onChange={() => { }}
                        style={{ width: "100%" }}
                        options={optionsStatus}
                    />
                </Col>
                <Col span={5}>
                    <Title level={5}>Assigned</Title>
                    <Select
                        onChange={() => { }}
                        style={{ width: "100%" }}
                    />
                </Col>
            </Row>
            <Table
                bordered
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 10,
                }}
            />
        </div>
    )
}

export default BodyIssues
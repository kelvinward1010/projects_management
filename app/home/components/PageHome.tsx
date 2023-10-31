"use client"
import { Row, Typography } from 'antd'
import React from 'react'
import ConfigLineChart from './charts/LineChart'
import { configData } from '@/app/equation';

interface Props {
    projects?: any;
}

const { Title } = Typography;

function PageHome({
    projects
}:Props) {
    const dataLine = configData(projects)
    
    return (
        <Row className='w-full mt-10' justify={'center'}>
            <div className='w-4/5'>
                <Title level={5}>1. Projects</Title>
                <ConfigLineChart data={dataLine}/>
            </div>
        </Row>
    )
}

export default PageHome
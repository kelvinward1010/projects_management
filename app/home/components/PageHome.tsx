import { Row } from 'antd'
import React from 'react'
import ColumnChart from './charts/ColumnChart'

function PageHome() {
    return (
        <Row className='w-full' justify={'center'}>
            <ColumnChart />
        </Row>
    )
}

export default PageHome
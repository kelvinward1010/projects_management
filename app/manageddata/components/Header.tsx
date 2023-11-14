"use client"
import { Typography } from 'antd';
import React from 'react'

const {Title, Text} = Typography;

function Header() {
    return (
        <div className='
            h-16
            w-full
            flex
            justify-between
            items-center'
        >
            <Title level={4}>Manage Data</Title>
        </div>
    )
}

export default Header
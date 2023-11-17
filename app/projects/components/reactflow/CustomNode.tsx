"use client"
import { workCompletionRateFormula } from '@/app/equation';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Progress, Typography } from 'antd';
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const {Text} = Typography;

export default memo((data: any, isConnectable) => {
    const completePrecent = Number(workCompletionRateFormula(data?.data?.epics).toFixed(3));
    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <div className='bg-white rounded' style={{ width: '200px', height: '100px' }}>
                <div className='w-full p-2 bg-teal-600 flex justify-between'>
                    <Text className='text-small line-clamp-1 text-white'>{data?.data?.title}</Text>
                    <UnorderedListOutlined className='text-white' onClick={() => console.log(`click + ${data?.data?.title}`)}/>
                </div>
                <div className='w-full px-2 text-black'>
                    <div className='w-full flex items-center justify-between h-[20px]'>
                        <p className='text-sm mr-2'>Progress:</p>
                        <Progress className='fix-css' percent={completePrecent} size="small" />
                    </div>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                style={{ top: 10, background: '#555' }}
                isConnectable={isConnectable}
            />
        </>
    );
});

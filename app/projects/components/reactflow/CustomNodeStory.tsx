"use client"
import { workCompletionRateFormula } from '@/app/equation';
import useUser from '@/app/hooks/useUser';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Progress, Typography } from 'antd';
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const {Text} = Typography;

export default memo((data: any, isConnectable) => {

    const completePrecent = Number(workCompletionRateFormula(data?.data?.tasks).toFixed(3));
    const user = useUser(data?.data?.userId)?.data;
    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <div className='bg-white rounded' style={{ width: '300px', height: '150px' }}>
                <div className='w-full h- p-2 bg-teal-600 flex justify-between'>
                    <Text className='text-small line-clamp-1 text-white'>{data?.data?.title}</Text>
                    <UnorderedListOutlined className='text-white' onClick={() => console.log(`click + ${data?.data?.title}`)}/>
                </div>
                <div className='w-full px-2 text-black'>
                    <div className='w-full flex items-center h-[20px]'>
                        <p className='text-sm mr-2'>Progress:</p>
                        {data?.data?.tasks?.length === 0 ? (
                            <div>
                                <p>No job yet.</p>
                            </div>
                        ):(
                            <>
                            <Progress className='fix-css' percent={completePrecent} size="small" />
                            </>
                        )}
                    </div>
                    <div className='w-full flex items-center h-[20px]'>
                        <p className='text-sm mr-2'>Created By:</p>
                        <p className='text-sm mr-2'>{user?.name}</p>
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

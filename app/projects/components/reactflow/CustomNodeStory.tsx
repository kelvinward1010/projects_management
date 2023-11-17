"use client"
import { workCompletionRateFormula } from '@/app/equation';
import useUser from '@/app/hooks/useUser';
import { DeleteFilled, EditOutlined, RightCircleFilled, UnorderedListOutlined } from '@ant-design/icons';
import { Dropdown, Modal, Progress, Typography } from 'antd';
import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import WorkInsideStory from './modal/WorkInsideStory';
import { useRouter } from 'next/navigation';

const {Text} = Typography;

export default memo((data: any, isConnectable) => {

    const router = useRouter();
    const [isModalSeeInside,setIsModalSeeInside] = useState(false);
    const [openActions,setOpenActions] = useState(false);
    const completePrecent = Number(workCompletionRateFormula(data?.data?.tasks).toFixed(3));
    const user = useUser(data?.data?.userId)?.data;

    const handleGoToStorys = (ev: any) => {
        ev.preventDefault();
        return router.push(`/storys/${data?.data?.id}`)
    };
    
    const items = [
        {
          label: <>
            <button
                className="
                    w-full
                    h-9
                    bg-sky-700
                    text-white
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-md
                    shadow-lg
                    px-2
                "
                onClick={()=>setIsModalSeeInside(true)}
            >
                <EditOutlined />
                Works inside
            </button>
          </>,
          key: '0',
        },
        {
            label: <>
              <button
                  className="
                      w-full
                      h-9
                      bg-sky-700
                      text-white
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-md
                      shadow-lg
                      px-2
                  "
                  onClick={handleGoToStorys}
              >
                  <RightCircleFilled />
                  Goto Story
              </button>
            </>,
            key: '1',
        },
    ];
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
                    <Dropdown
                        menu={{
                        items,
                        }}
                        trigger={['click']}
                    >
                        <UnorderedListOutlined className='text-white'
                            onClick={() => setOpenActions(!openActions)}
                        />
                    </Dropdown>
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
                <Modal
                    title={`Title story: ${data?.data?.title}`} 
                    open={isModalSeeInside} 
                    onCancel={() => setIsModalSeeInside(false)}
                    className="modal-edit"
                    width={1300}
                >
                    <WorkInsideStory story={data?.data} />
                </Modal>
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

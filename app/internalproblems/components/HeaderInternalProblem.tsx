"use client"
import { Modal, Typography } from 'antd';
import { useState } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import BodyInCreateInternalProblem from './BodyInCreateInternalProblem';

const { Title, Text} = Typography;

interface Props{
    story?: any;
}

function HeaderInternalProblem({
    story
}:Props) {

    const [isModalOpenCreate,setIsModalOpenCreate] = useState(false);

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
            <Title level={4} className='line-clamp-1'>Title story: {story?.title}</Title>
            <div className='flex items-center justify-center'>
                {/* <div className='mx-5'>
                    <button
                        className="
                            w-52
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
                        Pie chart
                    </button>
                    <Modal 
                        title={`Pie chart for task: ${epic?.title}`} 
                        open={isModalOpenChartPie} 
                        onCancel={() => setIsModalOpenChartPie(false)}
                        className="modal-edit"
                        width={1200}
                    >
                        <ChartEpic task={epic}/>
                    </Modal>
                </div> */}
                <div>
                    <button
                        className="
                            w-40
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
                        onClick={()=>setIsModalOpenCreate(true)}
                    >
                        <AiOutlineFileAdd />
                        Create
                    </button>
                    <Modal 
                        title={`Create internal problem`} 
                        open={isModalOpenCreate} 
                        onCancel={() => setIsModalOpenCreate(false)}
                        className="modal-edit"
                        width={1200}
                    >
                        <BodyInCreateInternalProblem 
                            story={story}
                            onClose={()=>setIsModalOpenCreate(false)}
                        />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default HeaderInternalProblem
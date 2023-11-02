import Avatar from '@/app/components/Avatar'
import useCurrentUser from '@/app/hooks/useCurrentUser';
import useUser from '@/app/hooks/useUser';
import { DashOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Projects } from '@prisma/client'
import { Button, Col, Dropdown, Flex, Modal, Row, Typography } from 'antd'
import { formatDistanceToNowStrict } from 'date-fns';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import DeleteModalSchedule from './modals/DeleteModalSchedule';
import EditModalSchedule from './modals/EditModalSchedule';

interface Props {
    project?: Projects;
    schedule?: any;
}

const {Title, Text} = Typography;

function ScheduleConversationItem({
    schedule
}:Props) {

    const currentUser = useCurrentUser().data;
    const [openActions, setOpenActions] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const user = useUser(schedule?.userId as string)?.data;

    const items = [
        {
          label: <>
            <Button className='text-teal-600 w-full' onClick={() => setOpenEdit(true)} icon={<EditOutlined />}>
                Edit
            </Button>
          </>,
          key: '0',
        },
        {
          label: <>
            <Button className='text-red-600 w-full' onClick={() => setOpenDelete(true)} icon={<DeleteOutlined />}>
                Delete
            </Button>
          </>,
          key: '1',
        },
    ];

    const createdAt = useMemo(() => {
        if (!schedule?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(schedule?.createdAt));
    }, [schedule?.createdAt])

    return (
        <>
            {openDelete && <Modal 
                open={openDelete} 
                onCancel={() => setOpenDelete(false)}
                className="modal-edit"
            >
                <DeleteModalSchedule
                    onClose={() => setOpenDelete(false)}
                    scheduleId={schedule?.id}
                />
            </Modal>}
            {openEdit && <Modal 
                open={openEdit} 
                onCancel={() => setOpenEdit(false)}
                className="modal-edit"
                width={700}
            >
                <EditModalSchedule
                    onClose={() => setOpenEdit(false)}
                    schedule={schedule}
                />
            </Modal>}
            <div className='w-full h-fit my-2 border-2 border-teal-600 rounded pb-2'>
                <Row justify={'space-between'} className='bg-gray-300 rounded-t'>
                    <Col span={19} className='p-2'>
                        <Flex justify={'flex-start'} align={'center'}>
                            {currentUser?.id === schedule?.userId ? (
                                <Avatar
                                    user={currentUser}
                                    image={currentUser?.profileImage || currentUser?.image}
                                />
                            ) : (
                                <Avatar
                                    user={user}
                                    image={user?.profileImage || user?.image}
                                />
                            )}
                            <div className="flex justify-center gap-2 items-center ml-4">
                                <Text className="text-xl font-semibold">{user?.name}</Text>
                                <Text className="text-md underline underline-offset-1">@{user?.name_Id}</Text>
                                <Text className="text-md">{createdAt}</Text>
                            </div>
                        </Flex>
                    </Col>
                    {currentUser?.id === schedule?.userId ? (<Col span={2} className='flex justify-center items-center'>
                        <Dropdown
                            menu={{
                            items,
                            }}
                            trigger={['click']}
                        >
                            <DashOutlined 
                                className='text-2xl cursor-pointer'
                                onClick={() => setOpenActions(!openActions)}
                            />
                        </Dropdown>
                    </Col>) : null}
                </Row>
                <Row className='pl-20'>
                    <Text>
                        {schedule?.content}
                    </Text>
                </Row>
                <Row className='pl-20'>
                    {schedule?.image && <Image
                        width="200"
                        height="150"
                        className="rounded"
                        src={schedule?.image}
                        alt="Image schedule"
                    />}
                </Row>
            </div>
        </>
    )
}

export default ScheduleConversationItem
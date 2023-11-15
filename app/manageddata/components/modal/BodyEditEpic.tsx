"use client"
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { Col,Modal,Row, Select } from 'antd';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as _ from "lodash/fp";
import {  EditOutlined} from '@ant-design/icons';
import InputEdit from '../input/InputEdit';
import { optionsStatus } from '@/app/config/options';
import useManageddata from '@/app/hooks/useMannageddata';

interface Props {
    epic?: any;
}

function BodyEditEpic({
    epic,
}:Props) {
    const router = useRouter();
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const {mutate: mutateAll} = useManageddata();

    const {
        register,
        setValue,
        watch,
        reset,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            title: epic?.name_ep,
            status: epic?.status_ep,
        }
    });
    const title = watch("title")
    const status = watch("status")

    const handleEpicEdit = () => {
        axios.post(`/api/epics/${epic?.id}`, {
            title: title,
            status: status,
        })
            .then(() => {
                router.refresh();
                mutateAll();
                setIsModalOpenEdit(false)
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Epic has been updated!')
            });
    }

    const style = epic?.status_ep === 'Done' ? 'green' : epic?.status_ep === 'Improgress' ? 'blue' : 'black';

    return (
        <>
            <EditOutlined
                className="text-xl text-teal-600 cursor-pointer"
                onClick={() =>setIsModalOpenEdit(true)}
            />
            <Modal
                title="Epic Edit" 
                open={isModalOpenEdit} 
                onCancel={() =>setIsModalOpenEdit(false)}
                className="modal-edit"
                width={1200}
            >
                <div className="w-full h-full">
                    <Row justify={'space-between'} className="items-center">
                        <Col span={11}>
                            <InputEdit
                                id="title"
                                errors={errors}
                                required
                                register={register}
                            />
                        </Col>
                        <Col span={11}>
                            <Select
                                onChange={(value) => setValue('status', value)}
                                options={[
                                    ...optionsStatus,
                                ]}
                                id='status'
                                value={status}
                                className='select-in-table'
                                style={{
                                    width:"100%", borderRadius: '5px', height: '42px', border: `1px solid ${style}`, padding: '3px 0'
                                }}
                            />
                        </Col>
                    </Row>
                </div>
                <button onClick={() => handleEpicEdit()} className="
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
                    mt-5
                ">
                    Submit
                </button>
            </Modal>
        </>
    )
}

export default BodyEditEpic
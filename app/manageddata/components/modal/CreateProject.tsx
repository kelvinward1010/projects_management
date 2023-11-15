"use client"

import Input from "@/app/components/inputs/Input";
import SelectConFig from "@/app/components/inputs/SelectConFig";
import useManageddata from "@/app/hooks/useMannageddata";
import useUsers from "@/app/hooks/useUsers";
import { ReconciliationOutlined } from "@ant-design/icons";
import { Modal, Select, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const {Title, Text} = Typography;

function CreateProject() {

    const [isLoading, setIsloading] = useState(false);
    const [isModalOpenCreateProject, setIsModalOpenCreateProject] = useState(false);
    const {mutate: mutateProject} = useManageddata();
    const {data: users} = useUsers();

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
            title: '',
            members: [],
            assignedTo: '',
        }
    });

    const members = watch('members');
    const title = watch('title');
    const assignedTo = watch('title');

    const onSubmit = () => {
        axios.post('/api/projects', {
            members: members,
            title: title,
            isAdminCreate: true,
            assignedTo: assignedTo
        })
            .then(() => {
                mutateProject();
                setIsModalOpenCreateProject(false)
                reset();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Project has been created!')
            });
    }

    return (
        <>
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
                    mr-5
                "
                onClick={()=> setIsModalOpenCreateProject(true)}
            >
                <ReconciliationOutlined />
                Create Project
            </button>
            <Modal
                title="Created Project" 
                open={isModalOpenCreateProject} 
                onCancel={() =>setIsModalOpenCreateProject(false)}
                className="modal-edit w-full"
                width={900}
            >
                <div className='
                    my-2
                    py-2
                    h-fit
                    w-full
                    border-4
                    border-sky-600
                    flex
                    items-center
                    justify-between
                '>
                    <div className='px-2 w-full'>
                        <Input
                            disabled={isLoading}
                            label="Title"
                            id="title"
                            errors={errors}
                            required
                            register={register}
                        />
                        <SelectConFig
                            disabled={isLoading}
                            label="Members"
                            options={users.map((user: any) => ({
                                value: user?.id,
                                label: user?.name
                            }))}
                            onChange={(value) => setValue('members', value, {
                                shouldValidate: true
                            })}
                            value={members}
                        />
                        <div className="w-full">
                            <Title level={5}>Assign To Who</Title>
                            <Select
                                placeholder="Select a person"
                                optionFilterProp="children"
                                options={users.map((user: any) => ({
                                    value: user?.id,
                                    label: user?.name
                                }))}
                                onChange={(value) => setValue('assignedTo', value, {
                                    shouldValidate: true
                                })}
                                style={{width: '100%'}}
                            />
                        </div>
                    </div>
                </div>
                <button onClick={onSubmit} className="
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

export default CreateProject
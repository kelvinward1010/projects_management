"use client"

import { Col, Flex, Modal, Row, Typography } from "antd";
import { useState } from "react";
import FormSettingStatus from "./input/FormSettingStatus";
import { takeDataAddStatus } from "@/app/equation";
import TableSetting from "./table/TableSetting";

const { Title, Text } = Typography;

interface Props {
    project?: any;
}

function BodySettings({
    project
}:Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEpics, setIsOpenEpics] = useState(false);
    const [isOpenInternals, setIsOpenInternals] = useState(false);
    const [isOpenStorys, setIsOpenStorys] = useState(false);
    
    const dataForEach = takeDataAddStatus(project?.addStatus)

    return (
        <>
            <Modal
                title="Add status"
                open={isOpen} 
                onCancel={() => setIsOpen(false)}
                className="modal-edit"
                width={700}
            >
                <FormSettingStatus
                    isEpics={isOpenEpics}
                    isInternals={isOpenInternals}
                    isStorys={isOpenStorys}
                    projectId={project?.id}
                    onClose={() => setIsOpen(false)}
                />
            </Modal>
            <div className="w-full h-full mt-5">
                <Title level={5}>1. Settings for status</Title>
                <div className="ml-10 w-full">
                    <div className="mt-5">
                        <Row justify={'start'}>
                            <Col span={2}>
                                <Text>1. Epics</Text>
                            </Col>
                            <Col span={15}>
                                <button
                                    className="
                                        w-32
                                        h-5
                                        bg-sky-700
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-md
                                        shadow-lg
                                        ml-5
                                    "
                                    onClick={() =>{
                                        setIsOpen(true);
                                        setIsOpenEpics(true);
                                        setIsOpenInternals(false);
                                        setIsOpenStorys(false);
                                    }}
                                >
                                    Add 
                                </button>
                            </Col>
                        </Row>
                        <TableSetting data={dataForEach?.listEpic} />
                    </div>
                    <div className="mt-5">
                        <Row justify={'start'}>
                            <Col span={2}>
                                <Text>2. Storys</Text>
                            </Col>
                            <Col span={15}>
                                <button
                                    className="
                                        w-32
                                        h-5
                                        bg-sky-700
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-md
                                        shadow-lg
                                        ml-5
                                    "
                                    onClick={() =>{
                                        setIsOpen(true);
                                        setIsOpenStorys(true);
                                        setIsOpenInternals(false);
                                        setIsOpenEpics(false);
                                    }}
                                >
                                    Add 
                                </button>
                            </Col>
                        </Row>
                       {dataForEach?.listStory.length >=1 ? <TableSetting data={dataForEach?.listStory} /> : null}
                    </div>
                    <div className="mt-5">
                        <Row justify={'start'}>
                            <Col span={2}>
                                <Text>3. Internals</Text>
                            </Col>
                            <Col span={15}>
                                <button
                                    className="
                                        w-32
                                        h-5
                                        bg-sky-700
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-md
                                        shadow-lg
                                        ml-5
                                    "
                                    onClick={() =>{
                                        setIsOpen(true);
                                        setIsOpenInternals(true);
                                        setIsOpenEpics(false);
                                        setIsOpenStorys(false);
                                    }}
                                >
                                    Add 
                                </button>
                            </Col>
                        </Row>
                        <TableSetting data={dataForEach?.listInternal} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BodySettings
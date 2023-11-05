"use client"

import { Col, Row } from "antd"
import SideBar from "./SideBar"
import BoardActions from "./BoardActions"

function PageHomeFlows() {
    return (
        <div className="w-full h-[900px] p-2">
            <Row justify={'space-between'} className="h-full">
                <Col span={4} className="border-2 border-teal-600">
                    <SideBar />
                </Col>
                <Col span={20} className="border-2 border-teal-600">
                    <BoardActions />
                </Col>
            </Row>
        </div>
    )
}

export default PageHomeFlows
"use client"
import { Card, Col, Row, Space } from "antd"
import CardNoti from "./CardNoti"
import SettingForNotifications from "./SettingForNotifications"
import useNotifications from "@/app/hooks/useNotifications";

function ListNoti() {
    const notifications = useNotifications()?.data;

    return (
        <div className="p-5 my-5 w-full">
            <Row justify={'space-between'}>
                <Col span={15}>
                    <Card
                        title="Notifications"
                        className="w-full border-2 border-teal-600"
                    >
                         <Space direction={'vertical'} className="w-full p-5 h-[750px] overflow-y-auto">
                            {notifications?.map((notification: any) => (
                                <CardNoti key={notification?.id} notification={notification}/>
                            ))}
                        </Space>
                    </Card>
                </Col>
                <Col span={7}>
                    <SettingForNotifications />
                </Col>
            </Row>
        </div>
    )
}

export default ListNoti
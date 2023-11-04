import { Card, Col, Row, Space } from "antd"
import CardNoti from "./CardNoti"
import SettingForNotifications from "./SettingForNotifications"

function ListNoti() {
    return (
        <div className="p-5 my-5 w-full">
            <Row justify={'space-between'}>
                <Col span={15}>
                    <Card
                        title="Notifications"
                        extra={<a href="#">More</a>}
                        className="w-full border-2 border-teal-600"
                    >
                         <Space direction={'vertical'} className="w-full p-5 h-[750px] overflow-y-auto">
                            <CardNoti />
                            <CardNoti />
                            <CardNoti />
                            <CardNoti />
                            <CardNoti />
                            <CardNoti />
                            <CardNoti />
                            <CardNoti />
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
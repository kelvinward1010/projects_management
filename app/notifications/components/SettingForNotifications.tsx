"use client"

import { Card } from "antd"

function SettingForNotifications() {
    return (
        <>
            <Card
                title="Setting notifications"
                extra={<a href="#">More</a>}
                className="w-full h-fit border-2 border-teal-600"
            >
                <p>Setting notifications content</p>
            </Card>
        </>
    )
}

export default SettingForNotifications
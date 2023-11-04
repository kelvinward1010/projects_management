"use client"

import { Card } from "antd"

function CardNoti() {
    return (
        <>
            <Card
                title="Title notifications"
                extra={<a href="#">More</a>}
                className="w-full border-2 border-teal-600"
            >
                <p>Card content</p>
            </Card>
        </>
    )
}

export default CardNoti
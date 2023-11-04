"use client"

import { Card, Col, Collapse, Row, Space, Typography } from "antd";

const { Title, Text } = Typography;

interface Props{
    titleLevel1?: string;
    titleLevel2?: string;
    number?: number;
    tasksForCard?: any[];
    active?: string;
}

function CardTasks({
    titleLevel1,
    titleLevel2,
    number,
    tasksForCard,
    active
}:Props) {
    const CardInListTasks = (title: any) => {
        return (
            <Row justify={'space-between'} className="w-full border-2 border-t-teal-600 py-2 px-2 rounded">
                <Col span={24}>
                    <Text className="line-clamp-1">{title}</Text>
                </Col>
            </Row>
        )
    }

    const TitleCollapse = (title: string) =>{
        const style =  title === 'Done' ? "green": title === 'Improgress' ? "blue" : "red";;

        return <Text className="text-xl" style={{color: `${style}`}}>{title}</Text>
    }

    return (
        <>
            <Card
                title={TitleCollapse(titleLevel1 as string)}
                bordered={false}
                style={{
                    width: 500,
                }}
                className="h-fit border-2 border-teal-600"
            >
                <Row justify={'space-between'}>
                    <Col span={10}>
                        <Text className="text-xl">{titleLevel2}</Text>
                    </Col>
                    <Col span={5}>
                        <Text className="text-2xl">{number}</Text>
                    </Col>
                </Row>
                <Collapse
                    collapsible="header"
                    items={[
                        {
                            key: active,
                            label: 'List tasks',
                            children: <>
                                <Space direction={'vertical'} className="w-full">
                                    {tasksForCard?.map((task) => (
                                        CardInListTasks(task?.title)
                                    ))}
                                </Space>
                            </>,
                        },
                    ]}
                    className="mt-5"
                />
            </Card>
        </>
    )
}

export default CardTasks
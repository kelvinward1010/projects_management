"use client"

import { DoubleRightOutlined } from "@ant-design/icons";
import { Card, Col, Collapse, Row, Space, Typography } from "antd";
import { useRouter } from "next/navigation";

const { Text } = Typography;

interface Props{
    titleLevel1?: string;
    titleLevel2?: string;
    number?: number;
    storyForCard?: any[];
    active?: string;
}

function CardStory({
    titleLevel1,
    titleLevel2,
    number,
    storyForCard,
    active
}:Props) {

    const router = useRouter();

    const handleGoToInternal = (ev: any) => {
        return router.push(`/internalproblems/${ev?.id}`)
    };

    const CardInListStory = (story: any) => {
        return (
            <Row justify={'space-between'} className="w-full border-2 border-t-teal-600 py-2 px-2 rounded">
                <Col span={15}>
                    <Text className="line-clamp-1">{story?.title}</Text>
                </Col>
                <Col span={2}>
                    <DoubleRightOutlined 
                        className='cursor-pointer text-xl' 
                        style={{color:'green'}}
                        onClick={() => handleGoToInternal(story)}
                    />
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
                    accordion
                    items={[
                        {
                            key: active,
                            label: 'List story',
                            children: <>
                                <Space direction={'vertical'} className="w-full">
                                    {storyForCard?.map((story) => (
                                        <div key={story?.id}>
                                            {CardInListStory(story)}
                                        </div>
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

export default CardStory
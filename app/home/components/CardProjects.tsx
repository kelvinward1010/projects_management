"use client"

import { DoubleRightOutlined } from "@ant-design/icons";
import { Card, Col, Collapse, Row, Space, Typography } from "antd";
import { useRouter } from "next/navigation";

const { Text } = Typography;

interface Props{
    titleLevel1?: string;
    titleLevel2?: string;
    number?: number;
    projectsForCard?: any[];
    active?: string;
}

function CardProjects({
    titleLevel1,
    titleLevel2,
    number,
    projectsForCard,
    active
}:Props) {

    const router = useRouter();

    const handleGoToProjects = (ev: any) => {
        return router.push(`/projects/${ev?.id}`)
    };

    const CardInListProjects = (project: any) => {
        return (
            <Row justify={'space-between'} className="w-full border-2 border-t-teal-600 py-2 px-2 rounded">
                <Col span={15}>
                    <Text className="line-clamp-1">{project?.title}</Text>
                </Col>
                <Col span={2}>
                    <DoubleRightOutlined 
                        className='cursor-pointer text-xl' 
                        style={{color:'green'}}
                        onClick={() => handleGoToProjects(project)}
                    />
                </Col>
            </Row>
        )
    }

    const TitleCollapse = (title: string) =>{
        const style = title === 'The project had finished' ? "green": "red";

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
                className="h-fit"
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
                            label: 'List projects',
                            children: <>
                                <Space direction={'vertical'} className="w-full">
                                    {projectsForCard?.map((project) => (
                                        <div key={project?.id}>
                                            {CardInListProjects(project)}
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

export default CardProjects
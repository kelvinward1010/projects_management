"use client"
import { Col, Row, Typography } from 'antd'
import React from 'react'
import CardProjects from './CardProjects';
import { takeDataDoneOrImprogressOrTodoInStorys, takeDataFollowDoneOrNot } from '@/app/equation';
import CardStory from './CardStory';

interface Props {
    projects?: any;
    currentUser?: any;
}

const { Title } = Typography;

function PageHome({
    projects,
    currentUser,
}:Props) {

    const dataForProjects = takeDataFollowDoneOrNot(projects);
    const dataForStory = takeDataDoneOrImprogressOrTodoInStorys(projects, currentUser?.id);
    
    return (
        <Row className='w-full mt-10 h-full overflow-y-auto' justify={'center'}>
            <div className='w-full px-10'>
                <Title level={2}>1. Projects</Title>
                <Row justify={'space-evenly'}>
                    <Col span={10}>
                        <CardProjects 
                            titleLevel1='The project had finished'
                            titleLevel2='Quantity:'
                            number={dataForProjects?.listDone?.length || 0}
                            active={'1'}
                            projectsForCard={dataForProjects?.listDone}
                        />
                    </Col>
                    <Col span={10}>
                        <CardProjects 
                            titleLevel1="The project's not completed"
                            titleLevel2='Quantity:'
                            number={dataForProjects?.listNotDone?.length || 0}
                            active={'2'}
                            projectsForCard={dataForProjects?.listNotDone}
                        />
                    </Col>
                </Row>
            </div>
            <div className='w-full px-10 mt-10'>
                <Title level={2}>2. Storys</Title>
                <Row justify={'space-between'}>
                <Col span={7}>
                        <CardStory 
                            titleLevel1='Done'
                            titleLevel2='Quantity:'
                            number={dataForStory?.listDone.length || 0}
                            storyForCard={dataForStory?.listDone}
                            active={'6'}
                        />
                    </Col>
                    <Col span={7}>
                        <CardStory 
                            titleLevel1='Improgress'
                            titleLevel2='Quantity:'
                            number={dataForStory?.listImprogress.length || 0}
                            storyForCard={dataForStory?.listImprogress}
                            active={'7'}
                        />
                    </Col>
                    <Col span={7}>
                        <CardStory 
                            titleLevel1='Todo'
                            titleLevel2='Quantity:'
                            number={dataForStory?.listTodo.length || 0}
                            storyForCard={dataForStory?.listTodo}
                            active={'8'}
                        />
                    </Col>
                </Row>
            </div>
        </Row>
    )
}

export default PageHome
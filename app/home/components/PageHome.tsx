"use client"
import { Col, Row, Typography } from 'antd'
import React from 'react'
import CardProjects from './CardProjects';
import { takeDataDoneOrImprogressOrTodoInEpics, takeDataDoneOrImprogressOrTodoInStorys, takeDataFollowDoneOrNot } from '@/app/equation';
import CardStory from './CardStory';
import CardEpics from './CardEpics';

interface Props {
    projects?: any;
}

const { Title } = Typography;

function PageHome({
    projects
}:Props) {

    const dataForProjects = takeDataFollowDoneOrNot(projects);
    const dataForEpic = takeDataDoneOrImprogressOrTodoInEpics(projects);
    const dataForStory = takeDataDoneOrImprogressOrTodoInStorys(projects)
    
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
                <Title level={2}>2. Epics</Title>
                <Row justify={'space-between'}>
                    <Col span={7}>
                        <CardEpics 
                            titleLevel1='Done'
                            titleLevel2='Quantity:'
                            number={dataForEpic?.listDone.length || 0}
                            epicsForCard={dataForEpic?.listDone}
                            active={'3'}
                        />
                    </Col>
                    <Col span={7}>
                        <CardEpics 
                            titleLevel1='Improgress'
                            titleLevel2='Quantity:'
                            number={dataForEpic?.listImprogress.length || 0}
                            epicsForCard={dataForEpic?.listImprogress}
                            active={'4'}
                        />
                    </Col>
                    <Col span={7}>
                        <CardEpics 
                            titleLevel1='Todo'
                            titleLevel2='Quantity:'
                            number={dataForEpic?.listTodo.length || 0}
                            epicsForCard={dataForEpic?.listTodo}
                            active={'5'}
                        />
                    </Col>
                </Row>
            </div>
            <div className='w-full px-10 mt-10'>
                <Title level={2}>3. Storys</Title>
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
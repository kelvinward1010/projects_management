"use client"
import { takeLengthStatusProjects } from '@/app/equation';
import PieChart from '@ant-design/plots/es/components/pie';
import { Typography } from 'antd';

const { Title } = Typography;

interface Props {
    projects?: any;
}

function ChartPieProjects({
    projects
}:Props) {
    
    const lengthInStatusProjects = takeLengthStatusProjects(projects)
    
    const data = [
        {
            type: 'Dự án đang triển khai',
            value: lengthInStatusProjects.lengthTodo,
        },
        {
            type: 'Dự án đã hoàn thành',
            value: lengthInStatusProjects.lengthDone,
        },
        {
            type: 'Dự án đang bị tạm dừng',
            value: lengthInStatusProjects.lengthBlock,
        },
    ];

    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        pieStyle: ({ type }: {type: any}) => {
            if (type == 'Dự án đã hoàn thành') {
                return {
                    fill: '#07e607',
                };
            }

            if (type == 'Dự án đang bị tạm dừng') {
                return {
                    fill: 'red',
                };
            }
        
            return {
                fill: 'blue',
            };
        },
        interactions: [
            {
                type: 'pie-legend-active',
            },
            {
                type: 'element-active',
            },
        ],
    };

    return (
        <div className="w-full mt-5">
            <Title level={5}>1. Pie chart</Title>
            <PieChart {...config} />
        </div>
    )
}

export default ChartPieProjects
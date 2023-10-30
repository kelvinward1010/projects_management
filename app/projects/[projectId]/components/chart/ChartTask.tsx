import { takeLengthStatus } from '@/app/equation';
import useIssues from '@/app/hooks/useIssues';
import PieChart from '@ant-design/plots/es/components/pie';

interface Props {
    task?: any;
}

function ChartTask({
    task,
}:Props) {

    const dataIssues = useIssues(task?.id as string);
    const getListIssues = dataIssues?.data?.issues;

    const lengthInStatusTasks = takeLengthStatus(getListIssues)
    
    const data = [
        {
            type: 'Todo',
            value: lengthInStatusTasks.lengthTodo,
        },
        {
            type: 'Improgress',
            value: lengthInStatusTasks.lengthImprogress,
        },
        {
            type: 'Done',
            value: lengthInStatusTasks.lengthDone,
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
            if (type === 'Done') {
                return {
                    fill: '#07e607',
                };
            }

            if (type === 'Improgress') {
                return {
                    fill: '#4385f7',
                };
            }
        
            return {
                fill: 'red',
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
        <>
            <PieChart {...config} />
        </>
    )
}

export default ChartTask
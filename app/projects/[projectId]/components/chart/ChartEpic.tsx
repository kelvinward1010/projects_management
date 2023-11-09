import { takeLengthStatus } from '@/app/equation';
import useEpic from '@/app/hooks/useEpic';
import PieChart from '@ant-design/plots/es/components/pie';

interface Props {
    epic?: any;
}

function ChartEpic({
    epic,
}:Props) {

    const dataEpics = useEpic(epic?.id as string);
    const getListStorys = dataEpics?.data?.storys;

    const lengthInStatusTasks = takeLengthStatus(getListStorys)
    
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

export default ChartEpic
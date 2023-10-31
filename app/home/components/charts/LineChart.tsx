"use client"
import LineChart from "@ant-design/plots/es/components/line";

interface Props {
    data?: any;
}

function ConfigLineChart({
    data
}: Props) {
    
    const config = {
        data,
        xField: 'month',
        yField: 'value',
        seriesField: 'type',
        yAxis: {
            label: {
                formatter: (v: any) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
        },
    };

    return (
        <div className="bg-white w-full mt-5">
            <LineChart {...config} />
        </div>
    )
}

export default ConfigLineChart
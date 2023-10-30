"use client"
import LineChart from "@ant-design/plots/es/components/line";
import { useEffect, useState } from "react";


function ColumnChart() {

    const data = [
        {
            "month": "Jan",
            "value": 3,
            "type": "Done"
        },
        {
            "month": "Jan",
            "value": 2,
            "type": "Todo"
        },
        {
            "month": "Feb",
            "value": 1,
            "type": "Todo"
        },
        {
            "month": "Feb",
            "value": 2,
            "type": "Done"
        },
        {
            "month": "Mar",
            "value": 1,
            "type": "Todo"
        },
        {
            "month": "Mar",
            "value": 5,
            "type": "Done"
        },
        {
            "month": "Apr",
            "value": 1,
            "type": "Done"
        },
        {
            "month": "Apr",
            "value": 3,
            "type": "Todo"
        },
        {
            "month": "May",
            "value": 4,
            "type": "Done"
        },
        {
            "month": "May",
            "value": 2,
            "type": "Todo"
        },
        {
            "month": "June",
            "value": 1,
            "type": "Done"
        },
        {
            "month": "June",
            "value": 6,
            "type": "Todo"
        },
        {
            "month": "July",
            "value": 2,
            "type": "Done"
        },
        {
            "month": "July",
            "value": 3,
            "type": "Todo"
        },
        {
            "month": "Aug",
            "value": 2,
            "type": "Done"
        },
        {
            "month": "Aug",
            "value": 3,
            "type": "Todo"
        },
        {
            "month": "Sep",
            "value": 3,
            "type": "Done"
        },
        {
            "month": "Sep",
            "value": 1,
            "type": "Todo"
        },
        {
            "month": "Oct",
            "value": 2,
            "type": "Done"
        },
        {
            "month": "Oct",
            "value": 3,
            "type": "Todo"
        },
        {
            "month": "Nov",
            "value": 0,
            "type": "Done"
        },
        {
            "month": "Nov",
            "value": 2,
            "type": "Todo"
        },
        {
            "month": "Dec",
            "value": 4,
            "type": "Done"
        },
        {
            "month": "Dec",
            "value": 1,
            "type": "Todo"
        },
    ];

    
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
        <div className="bg-white w-4/5 mt-5">
            <LineChart {...config} />
        </div>
    )
}

export default ColumnChart
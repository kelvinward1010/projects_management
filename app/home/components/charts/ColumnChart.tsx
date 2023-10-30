"use client"
import LineChart from "@ant-design/plots/es/components/line";
import { useEffect, useState } from "react";


function ColumnChart() {

    const data = [
        {
            "month": "Jan",
            "value": 0,
            "type": "Todo"
        },
        {
            "month": "Jan",
            "value": 0,
            "type": "Done"
        },
        {
            "month": "Feb",
            "value": 0,
            "type": "Todo"
        },
        {
            "month": "Feb",
            "value": 0,
            "type": "Done"
        },
        {
            "month": "Mar",
            "value": 0,
            "type": "Todo"
        },
        {
            "month": "Mar",
            "value": 0,
            "type": "Done"
        },
        {
            "month": "Apr",
            "value": 0,
            "type": "Todo"
        },
        {
            "month": "Apr",
            "value": 0,
            "type": "Done"
        },
        {
            "month": "May",
            "value": 0,
            "type": "Todo"
        },
        {
            "month": "May",
            "value": 0,
            "type": "Done"
        },
        {
            "month": "Jun",
            "value": 0,
            "type": "Todo"
        },
        {
            "month": "Jun",
            "value": 0,
            "type": "Done"
        },
        {
            "month": "Jul",
            "value": 0,
            "type": "Todo"
        },
        {
            "month": "Jul",
            "value": 0,
            "type": "Done"
        },
        {
            "month": "Aug",
            "value": 0,
            "type": "Todo"
        },
        {
            "month": "Aug",
            "value": 0,
            "type": "Done"
        },
        {
            "month": "Seb",
            "value": 0,
            "type": "Todo"
        },
        {
            "month": "Seb",
            "value": 0,
            "type": "Done"
        },
        {
            "month": "Oct",
            "value": 1,
            "type": "Todo"
        },
        {
            "month": "Oct",
            "value": 2,
            "type": "Done"
        },
        {
            "month": "Nov",
            "value": 0,
            "type": "Todo"
        },
        {
            "month": "Nov",
            "value": 0,
            "type": "Done"
        },
        {
            "month": "Dec",
            "value": 0,
            "type": "Todo"
        },
        {
            "month": "Dec",
            "value": 0,
            "type": "Done"
        }
    ]

    
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

export default ColumnChart
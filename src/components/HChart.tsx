"use client"
import { useRef } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

export default function HChart(){



    const ChartOptions: Highcharts.Options = {
        chart: {
            type: "line"
        },
        subtitle: {
            text: "Source: RESAS API"
        },
        title: {
            text: "人口構成"
        },
        xAxis: {
            title: {
                text: "年"
            },
            categories: [
                /**ここにそのデータをとった年を入れていく */
            ]
        },
        yAxis: {
            title: {
                text: "人口"
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            },
        },
        series: [
            /**
             * 以下の形式でデータを入れていく
             * {
             *   name: 都道府県名,
             *   data: [人口データ]
             * }
             */
        ]
    }

    const chartRef = useRef<HighchartsReact.RefObject>(null)

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={ChartOptions}
            ref={chartRef}
        />
    )
}

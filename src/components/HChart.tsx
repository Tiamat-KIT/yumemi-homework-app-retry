"use client"
import { useRef } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

import { PrefPopulationData } from "@/types/resas"

export default function HChart({
    PopulateYears,
    chartDatus
}:{
    PopulateYears: Array<string>,
    chartDatus: PrefPopulationData[]
}){
    

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
            categories: PopulateYears
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
        
            /**
             * 以下の形式でデータを入れていく
             * {
             *   name: 都道府県名,
             *   data: [人口データ]
             * }
             */
            series: chartDatus !== undefined ? chartDatus.map((PrefPopulate) => {
                return {
                    name: PrefPopulate.PrefName,
                    data: PrefPopulate.PopulationValues.filter((Populate) => {return Populate.label === "総人口"})
                }
            }) as Highcharts.SeriesOptionsType[] : []
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

"use client"
import { useEffect, useRef, useState } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useAtom } from "jotai"
import { AtomPrefectures } from "@/globalstate/prefcodes"
import RESAS from "@/resas"
import { FetchedPopulation,PrefPopulationData } from "@/types/resas"

export default function HChart(){
    const [fetchState,setFetchState] = useState<FetchedPopulation>()
    const [PopulateYears,setPopulateYears] = useState<string[]>([])
    const [chartDatus,setChartDatus] = useState<PrefPopulationData[]>()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [prefState,_] = useAtom(AtomPrefectures)

    useEffect(() => {
        RESAS()({
            name: "population",
            prefDatus: prefState
        }).then(res => {
            
            console.log(res)
            setFetchState(res as FetchedPopulation)
            if(fetchState === undefined){
                throw new Error("都道府県のデータをAPIから正常に取得できていないです")
            }
            fetchState[0].result.data.forEach((population) => {
                population.data.forEach((populate) => {
                    setPopulateYears([...PopulateYears,`${populate.year}`])
                })
            })
            setChartDatus(
                [
                    ...prefState.map((prefecture,idx) => {
                        if(fetchState === undefined){
                            throw new Error(`${idx + 1}番目の都道府県のデータをが正常に取得できていないです`)
                        }
                        return {
                                PrefName: prefecture.prefName,
                                PopulationValues: fetchState[idx].result.data
                            } satisfies PrefPopulationData
                        })
                ]
            )
            if(chartDatus === undefined){
                throw new Error("都道府県データを正常にセットできていません in UseEffect")
            }
        })
    },[prefState])

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

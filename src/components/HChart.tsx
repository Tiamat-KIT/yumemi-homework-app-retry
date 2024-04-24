"use client"
import { useEffect, useState,useRef} from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useAtom } from "jotai"
/* import useSWR from "swr" */
import { AtomPopulationJanr } from "@/globalstate/population-select"
import { AtomPrefectures } from "@/globalstate/prefcodes"
import { Population, PrefPopulationData } from "@/types/resas"


export default function HChart(){
    const chartRef = useRef<HighchartsReact.RefObject>(null)
    const [PopulateSelect, ] = useAtom(AtomPopulationJanr)

    const [ViewData, setViewData] = useState<Array<PrefPopulationData>>([])

    const [chartState, setChartState] = useState<PrefPopulationData[]>()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [prefState,_] = useAtom(AtomPrefectures)
    console.log("Atomを使うFormの現在の入力値は",prefState)

    useEffect(() => {
        console.log("Atomを使うFormの現在の入力値は",prefState)
        const PrefPopulations = fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL ? process.env.NEXT_PUBLIC_VERCEL_URL : "http://localhost:3000"}/api/population?prefcodes=${[...prefState.map(pref => {return pref.prefCode})].join(",")}&janr=${PopulateSelect}` , {method: "POST",next: {revalidate: 3600}}).then(res => res.json()).then((PrefPopulationData) => {
            return PrefPopulationData as {
                message: string | null;
                result: {
                    boundaryYear: number;
                    data: Population;
                };
            }[]
        })
        PrefPopulations.then((PrefPopulationData) => {
            if(PrefPopulationData === undefined){
                throw new Error("データが取得できませんでした")
            }
            console.log("エラーの原因をみる",PrefPopulationData)

            setChartState([...prefState.map((pref,idx) => {
                return {
                    PrefName: pref.prefName,
                    PopulationValues: PrefPopulationData[idx].result.data.data.map((Populate) => {
                        return {
                            year: Populate.year,
                            value: Populate.value
                        }
                    })
                }
            }) as unknown  as PrefPopulationData[]])
        })
    },[...prefState,PopulateSelect])

    setViewData(chartState!.map((pref) => {
        return {
            PrefName: pref.PrefName,
            PopulationValues: pref.PopulationValues[PopulateSelect].data.map((Populate) => {
                return Populate.value
            })
        }
    }) as unknown as PrefPopulationData[])
    

    const PopulateYears = chartState !== undefined ? chartState[0].PopulationValues[0].data.map((Populate) => {return `${Populate.year}`}) : []

    console.log("年代の配列は",PopulateYears)
    console.log("チャートのデータは",chartState)    
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        series: ViewData as any[]
    }

    

    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={ChartOptions}
                ref={chartRef}
            />
        </>
    )
}

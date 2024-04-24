"use client"
import { /* use,  */useEffect,/*  useRef, useState */ } from "react"
/* import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official" */
import { useAtom } from "jotai"
/* import useSWR from "swr" */
import { AtomPrefectures } from "@/globalstate/prefcodes"
/* import { PopulationResponse, PrefPopulationData } from "@/types/resas" */

export default function HChart(){
    //const chartRef = useRef<HighchartsReact.RefObject>(null)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [prefState,_] = useAtom(AtomPrefectures)
    console.log("Atomを使うFormの現在の入力値は",prefState)
    useEffect(() => {
        console.log("Atomを使うFormの現在の入力値は",prefState)
        const PrefPopulations = fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL ? process.env.NEXT_PUBLIC_VERCEL_URL : "http://localhost:3000"}/api/population/${prefState.map(pref => pref.prefCode).join(",")}` , {method: "GET",next: {revalidate: 3600}})
        /* const PrefPopulationData = (await PrefPopulations).json() as Promise<PopulationResponse[]> */
        PrefPopulations.then(res => res.json()).then((PrefPopulationData) => {
            console.log("Next.jsのRoute Handlerから取得した人口レスポンスは",PrefPopulationData)
        })
    },[...prefState])
    /* const {data: PopulationResponses,isLoading: PopulationsIsLoading}= useSWR(
        `${process.env.NEXT_PUBLIC_VERCEL_URL ? process.env.NEXT_PUBLIC_VERCEL_URL : "http://localhost:3000"}/api/population/${prefState.map(pref => pref.prefCode).join(",")}` , 
        (url) => fetch(url, {method: "GET",next: {revalidate: 3600}}).then(res => res.json()/*  as Promise<PopulationResponse[]>)
    )
    if(!PopulationsIsLoading){
        console.log("Next.jsのRoute Handlerから取得した人口レスポンスは",PopulationResponses)
    } */
    
    /**
    useEffect(() => {
        setChartState(prefState.map((pref,idx) => {
            return {
                PrefName: pref.prefName,
                PopulationValues: PopulationResponses !== undefined && PopulationResponses[idx].result.data.map((Populate) => {
                    return {
                        label: Populate.label,
                        data: Populate.data.map((Popu) => {
                            return {
                                year: Popu.year,
                                value: Popu.value,
                                rate: Popu.rate
                            }
                        })
                    }
                
                })
            }
        }) as PrefPopulationData[])
    },[PopulationResponses])


    const PopulateYears = !PopulationsIsLoading && PopulationResponses !== undefined ? PopulationResponses[0].result.data[0].data.map((Populate) => `${Populate.year}`) : []

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
            // series: chartState as unknown as Highcharts.SeriesOptionsType[]
            /* chartDatus !== undefined ? chartDatus.map((PrefPopulate) => {
                return {
                    name: PrefPopulate.PrefName,
                    data: PrefPopulate.PopulationValues.filter((Populate) => {return Populate.label === "総人口"})
                }
            }) as Highcharts.SeriesOptionsType[] : [] */
    //}

    

    return (
        <>
            {/* {PopulationsIsLoading ? (
                <p>Loading...</p>
            ) : (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions}
                    ref={chartRef}
                />
            )}    */} 
        </>
        
    )
}

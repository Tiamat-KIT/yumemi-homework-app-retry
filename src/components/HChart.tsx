"use client"
import { useEffect, useState, useRef } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useAtom } from "jotai"
/* import useSWR from "swr" */
import { AtomPrefectures } from "@/globalstate/prefcodes"
import { PopulationResponse, PrefPopulationData } from "@/types/resas"

export default function HChart() {
  const chartRef = useRef<HighchartsReact.RefObject>(null)
  const [chartState, setChartState] = useState<PrefPopulationData[]>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [prefState, _] = useAtom(AtomPrefectures)
  console.log("Atomを使うFormの現在の入力値は", prefState)
  useEffect(() => {
    console.log("Atomを使うFormの現在の入力値は", prefState)
    const PrefPopulations = fetch(`https://yumemi-homework.vercel.app/api/population?prefcodes=${[
        ...prefState.map(pref => {
          return pref.prefCode
        })
      ].join(",")}`,
      { method: "POST", next: { revalidate: 3600 } }
    )
      .then(res => res.json())
      .then(PrefPopulationData => {
        return PrefPopulationData as PopulationResponse[]
      })
    PrefPopulations.then(PrefPopulationData => {
      if (PrefPopulationData === undefined) {
        throw new Error("データが取得できませんでした")
      }
      console.log("エラーの原因をみる", PrefPopulationData)
      setChartState(
        prefState.map((pref, idx) => {
          return {
            PrefName: pref.prefName,
            PopulationValues: PrefPopulationData[idx].result.data.map(Populate => {
              return {
                label: Populate.label,
                data: Populate.data.map(Popu => {
                  return {
                    year: Popu.year,
                    value: Popu.value,
                    rate: Popu.rate
                  }
                })
              }
            })
          }
        })
      )
    })
  }, [...prefState])

  const PopulateYears =
    chartState !== undefined
      ? chartState[0].PopulationValues[0].data.map(Populate => {
          return `${Populate.year}`
        })
      : []

  console.log("年代の配列は", PopulateYears)
  console.log("チャートのデータは", chartState)
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
      }
    },
    /**
     * 以下の形式でデータを入れていく
     * {
     *   name: 都道府県名,
     *   data: [人口データ]
     * }
     */
    series: chartState?.map(pref => {
      // 総人口だけ表示
      return {
        name: pref.PrefName,
        data: pref.PopulationValues[0].data.map(Populate => {
          return Populate.value
        })
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any[]
  }

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={ChartOptions} ref={chartRef} />
    </>
  )
}

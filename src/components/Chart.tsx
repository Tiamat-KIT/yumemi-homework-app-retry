"use client"
import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart"
import { AtomPrefectures } from "@/globalstate/prefcodes"
import RESAS from "@/resas"
import style from "@/styles/chart.module.css"
import { PrefecturePopulationData,ChartData } from "@/types/resas"

export default function Chart() {
  const [fetchState, setFetchState] = useState<PrefecturePopulationData>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [prefState,_] = useAtom(AtomPrefectures)
  useEffect(() => {
    RESAS()({
      name: "population",
      prefDatus: prefState
    }).then(res => {
      setFetchState(res as PrefecturePopulationData)
    })
  },[prefState])
  console.log(fetchState)
  
  const ChartProp: CategoricalChartProps = {
    width: 580,
    height: 200,
    data: [fetchState],
    margin: {
      top: 5,
      right: 5,
      left: 5,
      bottom: 5
    }
  }
  return (
    <div className={style.container}>
      <LineChart {...ChartProp}>
        <CartesianGrid strokeDasharray="3 3">
          <XAxis dataKey="any" />
          <YAxis dataKey="問題数" />
          <Line type="monotone" dataKey="問題数" stroke="#8884d8" />
          <Line type="monotone" dataKey="正解数" stroke="#3ba2f6" />
          <Line type="monotone" dataKey="正解率" stroke="#ff0092" />
          <Legend />
          <Tooltip />
        </CartesianGrid>
      </LineChart>
    </div>
  )
}

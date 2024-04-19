"use client"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart"
import style from "@/styles/chart.module.css"

export default function Chart() {
  const ChartProp: CategoricalChartProps = {
    width: 580,
    height: 200,
    data: [],
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

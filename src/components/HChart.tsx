"use client"
import { useRef, useCallback } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useAtom } from "jotai"
/* import useSWR from "swr" */
import useSWR from "swr"
import { AtomPrefectures } from "@/globalstate/prefcodes"
import { AtomJanr } from "@/globalstate/selectjanr"
import { PopulationResponse } from "@/types/resas"

export default function HChart() {
  const chartRef = useRef<HighchartsReact.RefObject>(null)
  /* const [chartState, setChartState] = useState<PrefPopulationData[]>() */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [prefState, _] = useAtom(AtomPrefectures)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selected,__] = useAtom(AtomJanr)

  const { data, isLoading } = useSWR(
    `/api/population?prefcodes=${prefState
      .map(pref => {
        return pref.prefCode
      })
      .join(",")}`,
    url =>
      fetch(url, {
        method: "POST",
        next: { revalidate: 3600 },
      }).then(res => {
        return res.json() as Promise<PopulationResponse[]>
      })
  )

  const MemoChart = useCallback(() => {
    if (isLoading) {
      return <p style={{ textAlign: "center" }}>Chart Loading...</p>
    }

    const PopulateYears = data![0].result.data[0].data.map(Populate => {
      return `${Populate.year}`
    })

    const chartState = prefState.map((pref, idx) => {
      return {
        PrefName: pref.prefName,
        PopulationValues: data![idx].result.data.filter(Populate => Populate.label === selected).map((Populate) => {
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

    const ChartOptions: Highcharts.Options = {
      chart: {
        type: "line"
      },
      subtitle: {
        text: "Source: RESAS API"
      },
      title: {
        text: `人口構成 ${data?.length}県の${selected}`
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
    return <HighchartsReact highcharts={Highcharts} options={ChartOptions} ref={chartRef} />
  }, [data,selected])

  return <MemoChart />
}

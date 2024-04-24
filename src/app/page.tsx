"use client"
import { useState, useCallback } from "react"
import { useAtom } from "jotai"
import useSWRImmutable from "swr/immutable"
import Form from "@/components/Form"
import HChart from "@/components/HChart"
import { AtomPrefectures } from "@/globalstate/prefcodes"
import RESAS from "@/resas"
import { FetchedPopulation, PrefPopulationData, PrefectureResponse } from "@/types/resas"

export default function Home() {
  const [fetchState,setFetchState] = useState<FetchedPopulation>()
  const [PopulateYears,setPopulateYears] = useState<string[]>([])
  const [chartDatus,setChartDatus] = useState<PrefPopulationData[]>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [prefState,_] = useAtom(AtomPrefectures)
  
    const {data: Prefectures,error}= useSWRImmutable("https://opendata.resas-portal.go.jp/api/v1/prefectures", (url) => fetch(url, {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.RESAS_API_KEY as string,
        "Content-Type": "application/json;charset=utf-8"
      }
    }).then(res => res.json() as Promise<PrefectureResponse>) 
  )
  if (error) throw error
  
  const FirstFetch = useCallback(() => RESAS()({
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
  }),[prefState])
  
  FirstFetch().then(() => {
    console.log("Fetch Success!")
  })

  return (
    <main>
        <HChart PopulateYears={PopulateYears} chartDatus={chartDatus ? chartDatus : []}/>
        <Form Prefectures={Prefectures ? Prefectures.result : []}/>
    </main>
  )
}

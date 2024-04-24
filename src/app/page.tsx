"use client"
import { use } from "react"
import { useAtom } from "jotai"
import useSWR from "swr"
import useSWRImmutable from "swr/immutable"
import Form from "@/components/Form"
import HChart from "@/components/HChart"
import { AtomPrefectures } from "@/globalstate/prefcodes"
import { PopulationResponse,PrefPopulationData, PrefectureResponse } from "@/types/resas"

export default function Home() {
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

  const {data: PrefsPopulatinonValue,isLoading} = useSWR(prefState,(prefs) => {
    return prefs.map((pref) => {
      return use(fetch(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${pref.prefCode}`).then(res => {
        return {
          PrefName: pref.prefName,
          PopulationValues: use(res.json().then((json) => (json as PopulationResponse).result.data))
          } satisfies PrefPopulationData
        }
      ))
    })
  })

  if(Prefectures === undefined){
    throw new Error("都道府県データの取得に失敗しました")
  }

  
  if(PrefsPopulatinonValue === undefined){
    throw new Error("データの取得に失敗しました。")
  }

  
  const YearsStr = PrefsPopulatinonValue[0].PopulationValues[0].data.map((PopulationDatus) => {
    return `${PopulationDatus.year}`
  }) 

  return (
    <main>
        {isLoading ? <p>Loading…</p> : <HChart PopulateYears={YearsStr} chartDatus={PrefsPopulatinonValue}/>}
        <Form Prefectures={Prefectures.result}/>
    </main>
  )
}

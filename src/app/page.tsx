"use client"
import { Suspense, useEffect, useState } from "react"
import Form from "@/components/Form"
/* import HChart from "@/components/HChart"*/
import { PrefectureResponse } from "@/types/resas" 
import { HomeURL } from "@/util/url"

export default function Home() {
  const [Prefectures,setPrefectures] = useState<PrefectureResponse>()

  const FetchPrefecture = async () => {
    const FetchPrefectureResponse = await fetch(`${HomeURL}/api/prefecture`,{ method: "GET", next: { revalidate: 3600 } })
    const PrefectureDatus = await FetchPrefectureResponse.json() as PrefectureResponse
    if(PrefectureDatus === undefined){
      throw new Error("データが取得できませんでした")
    }
    return PrefectureDatus
  }

  useEffect(() => {
    FetchPrefecture().then(PrefectureDatus => {
      setPrefectures(PrefectureDatus)
    })
  },[])


  return (
    <main>
      {/* <HChart /> */}
      <Suspense>
        <Form PrefectureNames={Prefectures!.result.map((pref) => {return `${pref.prefName}`})} />
      </Suspense>
    </main>
  )
}

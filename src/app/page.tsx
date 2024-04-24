
"use client"
import useSWRImmutable from "swr/immutable"
import Form from "@/components/Form"
import HChart from "@/components/HChart"
import { PrefectureResponse } from "@/types/resas"

export default function Home() {
  
  const {data: Prefectures,error}= useSWRImmutable("https://opendata.resas-portal.go.jp/api/v1/prefectures", (url) => fetch(url, {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.RESAS_API_KEY as string,
        "Content-Type": "application/json;charset=utf-8"
      }
    }).then(res => res.json() as Promise<PrefectureResponse>) 
  )
  if (error) throw error
  if (!Prefectures) return console.log("Loading...")

  return (
    <main>
        <HChart />
        <Form Prefectures={Prefectures.result}/>
    </main>
  )
}

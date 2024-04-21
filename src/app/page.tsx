
"use client"
import useSWR from "swr"
import Form from "@/components/Form"
import { Prefecture } from "@/types/resas"

export default function Home() {
  const {data: Prefectures,error}= useSWR("https://opendata.resas-portal.go.jp/api/v1/prefectures", (url) => fetch(url, {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.RESAS_API_KEY as string,
        "Content-Type": "application/json;charset=utf-8"
      }
    }).then(res => res.json() as Promise<Prefecture[]>) 
  )
  if (error) throw error
  if (!Prefectures) return console.log("Loading...")
  console.log(Prefectures)
  return (
    <main>
        {/* <Chart /> */}
        {/* <Form Prefectures={Prefectures}/> */}
    </main>
  )
}

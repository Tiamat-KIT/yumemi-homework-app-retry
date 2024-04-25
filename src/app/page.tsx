"use client"
import useSWR from "swr"
import Form from "@/components/Form"
import HChart from "@/components/HChart"
import { PrefectureResponse } from "@/types/resas"
import { HomeURL } from "@/util/url"

export default function Home() {
  const fetchUrl = `${HomeURL}/api/prefecture`
  const { data, isLoading } = useSWR(fetchUrl, url =>
    fetch(url, { method: "GET", next: { revalidate: 3600 } }).then(res => {
      if (!res.ok) {
        throw new Error("Failed to fetch")
      }
      return res.json() as Promise<PrefectureResponse>
    })
  )

  return (
    <main>
      <HChart />
      {isLoading || data === undefined ? (
        <p style={{ textAlign: "center" }}>Form Loading...</p>
      ) : (
        <Form
          PrefectureNames={data.result.map(pref => {
            return `${pref.prefName}`
          })}
        />
      )}
    </main>
  )
}

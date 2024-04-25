"use client"
/* import Form from "@/components/Form"
import HChart from "@/components/HChart"
import { PrefectureResponse } from "@/types/resas" */
import { HomeURL } from "@/util/url"

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  fetch(
    `${HomeURL}/api/prefecture`,
    { method: "GET", next: { revalidate: 3600 } }
  ).then(res => res.json()).then((PrefectureDatus) => {
    console.log(PrefectureDatus)
  })

  return (
    <main>
      {/* <HChart />
      <Form PrefectureNames={PrefectureNames} /> */}
    </main>
  )
}

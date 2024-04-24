import Form from "@/components/Form"
import HChart from "@/components/HChart"
import { PrefectureResponse } from "@/types/resas"
import { HomeURL } from "@/util/url"

export default async function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const PrefecturesResponseObject = await fetch(
    `${HomeURL}/api/prefecture`,
    { method: "GET", next: { revalidate: 3600 } }
  )
  const PrefectureDatus = (await PrefecturesResponseObject.json()) as PrefectureResponse
  const prefs = PrefectureDatus.result

  const PrefectureNames = prefs.map(pref => pref.prefName)
  console.log("rendering")
  return (
    <main>
      <HChart />
      <Form PrefectureNames={PrefectureNames} />
    </main>
  )
}

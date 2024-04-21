import {currentPageState} from "nrstate"
import PageStateProvider from "nrstate-client/PageStateProvider"
import Chart from "@/components/Chart"
import Form from "@/components/Form"
import RESAS from "@/resas"
import {PrefState,initialPrefState,path} from "@/state/submit-prefcode"
import {  Prefecture, PrefectureResponse } from "@/types/resas"

export default async function Home() {
  const Resas = RESAS()
  const Prefectures = (await Resas({ name: "prefectures" })) as unknown as PrefectureResponse
  return (
    <main>
      <PageStateProvider
        current={currentPageState<PrefState>(initialPrefState,path)}
        >
        <Chart />
        <Form Prefectures={Prefectures.result as Prefecture[]} />
      </PageStateProvider>
    </main>
  )
}

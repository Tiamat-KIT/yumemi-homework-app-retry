import {currentPageState} from "nrstate"
import PageStateProvider from "nrstate-client/PageStateProvider"
import Chart from "@/components/Chart"
// import Form from "@/components/Form"
import TestForm from "@/components/TestForm"
import {prefCodes,initialPrefCodes,path} from "@/state/submit-prefcode"
// import RESAS from "@/resas"
// import {  Prefecture, PrefectureResponse } from "@/types/resas"

export default async function Home() {
  /* const Resas = RESAS()
  const Prefectures = (await Resas({ name: "prefectures" })) as unknown as PrefectureResponse */
  return (
    <main
      style={{
        height: "60vh"
      }}
    >
      <PageStateProvider
        current={currentPageState<prefCodes>(initialPrefCodes,path)}
        >
        <Chart />
        {/* <Form Prefectures={Prefectures.result as Prefecture[]} /> */}
        <TestForm />
      </PageStateProvider>
    </main>
  )
}

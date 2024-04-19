import Chart from "@/components/Chart"
import Form from "@/components/Form"
// import RESAS from "@/resas"
import { Prefecture, /* PrefectureResponse */ } from "@/types/resas"


export default async function Home() {
  // const Resas = RESAS()
  // const Prefectures = (await Resas({ name: "prefectures" })) as unknown as PrefectureResponse
  const dummy: Prefecture[] = Array(6).map((num) => {
    return {
      prefCode: num,
      prefName: `都道府県${num}`
    }
  })
  return (
    <main
      style={{
        height: "60vh"
      }}
    >
      <Chart />
      <Form Prefectures={/* Prefectures.result as Prefecture[] */dummy} />
    </main>
  )
}

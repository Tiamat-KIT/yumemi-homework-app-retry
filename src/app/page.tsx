import Chart from "@/components/Chart";
import Form from "@/components/Form";
import RESAS from "@/resas";
import { PrefectureResponse } from "@/types/resas";

export default async function Home() {
  const Resas = RESAS()
  const Prefectures = await Resas({name: "prefectures"}) as unknown as PrefectureResponse
  return (
    <main style={{
      height: "60vh",
    }}>
      <Chart />
      <Form Prefectures={Prefectures.result} />
    </main>
  );
}

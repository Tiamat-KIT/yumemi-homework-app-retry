import { PrefectureResponse } from "@/types/resas"

async function GET() {
  if (process.env.RESAS_API_KEY === "" || process.env.RESAS_API_KEY === undefined) {
    throw new Error("API_KEYが設定されていません")
  }
  const res = await fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
    method: "GET",
    headers: {
      "X-API-KEY": process.env.RESAS_API_KEY as string,
      "Content-Type": "application/json;charset=utf-8"
    }
  })

  if (!res.ok) {
    throw new Error("取得に失敗しました")
  } else if (res.status === 429) {
    throw new Error("リクエスト回数が上限を超えました")
  }

  const Prefectures = (await res.json()) as PrefectureResponse
  return Response.json({Prefectures})
}

export { GET}
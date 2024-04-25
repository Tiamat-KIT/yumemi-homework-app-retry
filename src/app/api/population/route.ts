import { PopulationResponse } from "../../../types/resas"

async function POST(request: Request) {
  if (process.env.RESAS_API_KEY === "" || process.env.RESAS_API_KEY === undefined) {
    throw new Error("API_KEYが設定されていません")
  }

  const { searchParams } = new URL(request.url)
  const params = searchParams.get("prefcodes")
  if (params === null) {
    throw new Error("パラメータが不正です")
  }
  // クエリパラメータは、"1,2,3,4"のようにカンマ区切りで送られてくるので、splitで配列に変換する
  const prefcodes = params.split(",").map(prefcode => {
    return parseInt(prefcode)
  })

  const PrefPopulations = await Promise.all(
    prefcodes.map(prefcode => {
      return fetch(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefcode}`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": process.env.RESAS_API_KEY as string,
            "Content-Type": "application/json;charset=utf-8"
          }
        }
      )
    })
  )
  const PrefPopulationData = await Promise.all(
    PrefPopulations.map(async res => {
      if (!res.ok) {
        throw new Error("取得に失敗しました")
      } else if (res.status === 404) {
        throw new Error("指定された都道府県コードが見つかりません")
      } else if (res.status === 429) {
        throw new Error("リクエストが多すぎます")
      } else if (res.status === 400) {
        throw new Error("リクエストが不正です")
      }
      return (await res.json()) as Promise<PopulationResponse>
    })
  )

  return Response.json(PrefPopulationData)
}

export { POST }

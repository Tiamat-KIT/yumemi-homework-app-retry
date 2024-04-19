import { FetchDataSelect, PopulationResponse, PrefectureResponse } from "@/types/resas"

export default function RESAS() {
  if (process.env.RESAS_API_KEY === "" || process.env.RESAS_API_KEY === undefined) {
    throw new Error("API_KEYが設定されていません")
  }

  return async function ResasFetch(category: FetchDataSelect) {
    const fetchUrls: string[] = []
    // 人口データが欲しいのに都道府県コードが指定されていない場合
    if (category.name === "population" && category.prefCodes === undefined) {
      throw new Error("都道府県コードが指定されていません")
    }

    if (category.name === "prefectures") {
      fetchUrls.push("https://opendata.resas-portal.go.jp/api/v1/prefectures")
    } else if (category.name === "population") {
      category.prefCodes?.forEach(prefCode => {
        fetchUrls.push(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`
        )
      })
    }

    const fetchOptions: RequestInit = {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.RESAS_API_KEY as string,
        "Content-Type": "application/json;charset=utf-8"
      }
    }

    if(fetchUrls.length === 1){
      const FetchPrefectureResponse = await fetch(fetchUrls[0],fetchOptions)
      
      if(!(FetchPrefectureResponse.ok)){
        throw new Error("取得に失敗しました")
      }

      return await FetchPrefectureResponse.json() as PrefectureResponse
    } else {
      const fetchDatus = await Promise.all(
        fetchUrls.map(url => {
          return fetch(url, fetchOptions).then(res => {
            if (res.ok) {
              return res.json() as Promise<PopulationResponse>
            } else {
              throw new Error("APIの取得に失敗しました")
            }
          })
        })
      )
      return fetchDatus
    }
  }
}

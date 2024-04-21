import { FetchDataSelect, PopulationResponse, PrefectureResponse } from "@/types/resas"

export default function RESAS() {
  if (process.env.RESAS_API_KEY === "" || process.env.RESAS_API_KEY === undefined) {
    throw new Error("API_KEYが設定されていません")
  }

  return async function ResasFetch(category: FetchDataSelect) {
    const fetchUrls: string[] = []
    // 人口データが欲しいのに都道府県コードが指定されていない場合
    if (category.name === "population" && category.prefDatus?.length === 0) {
      throw new Error("都道府県データが指定されていません")
    }


    if (category.name === "prefectures") {
      fetchUrls.push("https://opendata.resas-portal.go.jp/api/v1/prefectures")
    } else if (category.name === "population") {
      if(category.prefDatus === undefined) {
        throw new Error("都道府県データが指定されていません")
      }
      category.prefDatus.forEach(pref => {
        fetchUrls.push(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${pref.prefCode}`
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

    if(fetchUrls.length === 1 && category.name === "prefectures"){
      const FetchPrefectureResponse = await fetch(fetchUrls[0],fetchOptions)
      
      if(!(FetchPrefectureResponse.ok)){
        throw new Error("取得に失敗しました")
      }

      return await FetchPrefectureResponse.json() as PrefectureResponse
    } else {
      const fetchDatus = await Promise.all(
        fetchUrls.map((url,idx) => {
          return fetch(url, fetchOptions).then(async res => {
            if (res.ok) {
              if(category.name === "population") {
                return {
                  [`${category.prefDatus![idx].prefName}`]: await res.json() as PopulationResponse
                }
              }
            } else {
              throw new Error("APIの取得に失敗しました")
            }
          })
        })
      )
      fetchDatus.map((fetchDatum) => {
        if(fetchDatum === undefined){
          throw new Error("取得に失敗しました")
        }
      })
      return fetchDatus as { [x: string]: PopulationResponse }[]
    }
  }
}

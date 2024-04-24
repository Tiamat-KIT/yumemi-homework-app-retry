/**
 * @param APIから返される人口構成データの型定義
 */

export type PopulationResponse = {
  message: string | null
  result: {
    boundaryYear: number
    data: Population[]
  }
}

/**
 * @param 人口の区分のユニオン型
 */
export type PopulationJanrUnion = "総人口" | "年少人口" | "生産年齢人口" | "老年人口"

/**
 *  @param 人口データ本体の型定義
 */
export type PopulationDataType = {
  year: number
  value: number
  rate?: number
}

/**
 * @param 県ごとの人口構成データの型定義
 */

export type Population = {
  label: PopulationJanrUnion
  data: PopulationDataType[]
}

/**
 * @param APIから返される都道府県一覧データの型定義
 */

export type PrefectureResponse = {
  message: string
  result: {
    prefCode: number
    prefName: string
  }[]
}

/**
 * @param 単一の都道府県の人口構成データの型定義
 */
export type Prefecture = {
  prefCode: number
  prefName: string
}

/**
 * @param APIのエンドポイントの名前
 */
export type FetchDataSelect =
  | {
      name: "prefectures"
    }
  | {
      name: "population"
      prefDatus?: Prefecture[]
    }

/**
 * @param 人口データ取得時のデータ形式定義
 */
export type FetchedPopulation = PopulationResponse[]

/**
 * @param グラフ表示の単体データ型定義
 */
export type PrefPopulationData = {
  PrefName: string
  PopulationValues: Population[]
}
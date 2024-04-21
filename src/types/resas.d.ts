/**
 * @param APIから返される人口構成データの型定義
 */

export type PopulationResponse = {
  message: string
  result: {
    boundaryYear: number
    data: Population[]
  }
}

/**
 * @param 県ごとの人口構成データの型定義
 */

export type Population = {
  label: string
  data: {
    year: number
    value: number
  }[]
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
 * @param Chart表示用のデータ型定義
 */
export type ChartData = {
  [x: string]: PopulationResponse
}[]

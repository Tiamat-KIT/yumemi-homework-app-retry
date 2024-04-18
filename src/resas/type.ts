/**
 * @param APIから取得できる人口構成のデータの型定義
 */

export type PopulationResponseType = {
    message: string,
    result: {
        boundaryYear: number,
        data: {
            label: string,
            data: {
                year: number,
                value: number
            }[]
        }[]
    }
}

/**
 * @param APIから取得できる都道府県一覧のデータの型定義
 */
export type PrefectureResponseType = {
    message: string,
    result: {
        prefCode: number,
        prefName: string
    }[]
}
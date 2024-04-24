import {
    atom
} from "jotai"


// 人口の区分は対応した配列のインデックスを使って引き出せる
export type ZeroToThree = 0 | 1 | 2 | 3

export const AtomPopulationJanr = atom<ZeroToThree>(0)


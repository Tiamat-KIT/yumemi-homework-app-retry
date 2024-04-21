import { Prefecture } from "@/types/resas"

export const path = "/"

export type PrefState = {
    pref: Prefecture[]
}

export const initialPrefState = {pref: [{
    prefCode: 27,
    prefName: "大阪県"
},{
    prefCode: 13,
    prefName: "東京都"
}]} as PrefState
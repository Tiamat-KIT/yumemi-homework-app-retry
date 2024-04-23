import {
    atom
} from "jotai"
import type {
    Prefecture
} from "@/types/resas"

export const AtomPrefectures = atom<Prefecture[]>([
    {
        prefCode: 27,
        prefName: "大阪県"
    },
    {
        prefCode: 13,
        prefName: "東京都"
    }
])
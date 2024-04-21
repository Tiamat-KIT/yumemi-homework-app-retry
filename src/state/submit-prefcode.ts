import { Prefecture } from "@/types/resas"

export const path = "/"

export type PrefState = {
    pref: Prefecture[]
}

export const initialPrefState = {pref: []} as PrefState
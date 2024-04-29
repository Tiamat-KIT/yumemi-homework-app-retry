import { atom } from "jotai";
import type { PopulationJanrUnion } from "@/types/resas";

export const AtomJanr = atom<PopulationJanrUnion>("総人口");
"use client"
import { useEffect, useRef } from "react"
import { useAtom } from "jotai"
import { Path, useForm, UseFormRegister, FieldValues, SubmitHandler } from "react-hook-form"
import { AtomPrefectures } from "@/globalstate/prefcodes"
import style from "@/styles/form.module.css"
import { Prefecture } from "@/types/resas"

export default function Form({ PrefectureNames = [] }: { PrefectureNames: Array<string>  }) {
  /**
   * 人口の分類の種類をStateで管理する予定
   */
  const ConstPrefectureNames = [...PrefectureNames] as const

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setPrefState] = useAtom(AtomPrefectures)
  interface PrefectureSelectState {
    SelectPrefectures: {
      [key in (typeof ConstPrefectureNames)[number]]: boolean
    }
  }

  interface CheckBoxProps<T extends FieldValues> {
    register: UseFormRegister<T>
    path: Path<T>
    label: string
  }

  const DefaultValues: PrefectureSelectState = {
    SelectPrefectures: {
      ...PrefectureNames.reduce(
        (properties, prefName) => {
          properties[prefName] = false
          return properties
        },
        {} as PrefectureSelectState["SelectPrefectures"]
      )
    }
  }

  const { register, handleSubmit, watch } = useForm<PrefectureSelectState>({
    defaultValues: DefaultValues
  })

  function CheckBox<T extends FieldValues>({ register, path, label }: CheckBoxProps<T>) {
    const LabelRef = useRef<HTMLLabelElement>(null)
    useEffect(() => {
      const LabelBackgroundColor = watch(`SelectPrefectures.${label}`) ? "linear-gradient(160deg, rgba(255,0,0,1) 0%, rgba(231,147,147,1) 50%, rgba(107,0,0,1) 100%, rgba(196,196,196,1) 100%)" : "linear-gradient(160deg, rgba(94,94,94,1) 0%, rgba(255,255,255,1) 50%, rgba(101,101,101,1) 100%, rgba(196,196,196,1) 100%)"
      const LabelShadowColor = watch(`SelectPrefectures.${label}`) ? "0 0 0 2px rgba(0, 0, 0, 0.5)" : "0 0 0 2px rgba(255, 255, 255, 0)"
      if (LabelRef.current === null) {
        throw new Error("label要素のRefが正常に処理されていません")
      }
      LabelRef.current.style.background = LabelBackgroundColor
      LabelRef.current.style.boxShadow = LabelShadowColor
    }, [watch(`SelectPrefectures.${label}`)])

    return (
      <label ref={LabelRef} className={style["checkbox"]}>
        <input hidden type="checkbox" {...register(path)} />
        {label}
      </label>
    )
  }

  const onSubmit: SubmitHandler<PrefectureSelectState> = (data: PrefectureSelectState) => {
    const PrefSubmitList: Prefecture[] = []
    for (const property in data["SelectPrefectures"]) {
      if (data["SelectPrefectures"][property] === true) {
        PrefSubmitList.push({
          prefCode: PrefectureNames.indexOf(property) + 1,
          prefName: property
        })
      }
    }
    setPrefState(PrefSubmitList)
  }

  return (
    <form className={style.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={style["checkbox-container"]}>
        {PrefectureNames.map(prefName => {
          return <CheckBox key={prefName} register={register} path={`SelectPrefectures.${prefName}`} label={prefName} />
        })}
      </div>
      {/** "総人口" | "年少人口" | "生産年齢人口" | "老年人口"を選択できるSelect要素を出す */}
      <select>
        <option value="総人口">総人口</option>
        <option value="年少人口">年少人口</option>
        <option value="生産年齢人口">生産年齢人口</option>
        <option value="老年人口">老年人口</option>
      </select>
      <button type="submit" className={style.button}>Submit</button>
    </form>
  )
}

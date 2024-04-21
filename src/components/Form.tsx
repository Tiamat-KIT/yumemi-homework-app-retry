"use client"
import { useEffect, useRef } from "react"
import {usePageState} from "nrstate-client"
import {
  Path,
  useForm,
  UseFormRegister,
  FieldValues,
  SubmitHandler
} from "react-hook-form"
import {path,PrefState} from "@/state/submit-prefcode"
import style from "@/styles/form.module.css"
import { Prefecture } from "@/types/resas"

export default function Form({ Prefectures }: { Prefectures: Prefecture[] }) {
  const PrefectureNames = Prefectures.map(pref => pref.prefName)
  const ConstPrefectureNames = [...PrefectureNames] as const

  const [,setPrefState] = usePageState<PrefState>()
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
      const LabelBackgroundColor = watch(`SelectPrefectures.${label}`) ? "red" : "darkgray"
      if (LabelRef.current === null) {
        throw new Error("label要素のRefが正常に処理されていません")
      }
      LabelRef.current.style.backgroundColor = LabelBackgroundColor
    }, [watch(`SelectPrefectures.${label}`)])

    return (
      <label ref={LabelRef} className={style["checkbox"]}>
        <input hidden type="checkbox" {...register(path)} />
        {label}
      </label>
    )
  }

  const onSubmit: SubmitHandler<PrefectureSelectState>  = (data: PrefectureSelectState) => {
    for(const property in data["SelectPrefectures"]){
      if(data["SelectPrefectures"][property] === true){
        setPrefState({
          pref: [{prefCode: Prefectures.find(pref => pref.prefName === property)!.prefCode, prefName: property}]
        },path)
      }
    }
  }

  return (
    <form
      className={style.container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={style["checkbox-container"]}>
        {PrefectureNames.map(prefName => {
          return <CheckBox key={prefName} register={register} path={`SelectPrefectures.${prefName}`} label={prefName} />
        })}
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

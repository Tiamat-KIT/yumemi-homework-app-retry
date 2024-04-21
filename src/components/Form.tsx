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
import {path,prefCodes} from "@/state/submit-prefcode"
import style from "@/styles/form.module.css"
import { Prefecture } from "@/types/resas"

export default function Form({ Prefectures }: { Prefectures: Prefecture[] }) {
  const PrefectureNames = Prefectures.map(pref => pref.prefName)
  const ConstPrefectureNames = [...PrefectureNames] as const

  const [prefCodeState, setPrefCodeState] = usePageState<prefCodes>()
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
    const PrefCodes = []
    for(const property in data["SelectPrefectures"]){
      if(data["SelectPrefectures"][property] === true){
        PrefCodes.push(Prefectures.find(pref => pref.prefName === property)?.prefCode)
      }
    }
    setPrefCodeState({prefCodes: PrefCodes as number[]},path)
    console.log(prefCodeState.prefCodes)
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

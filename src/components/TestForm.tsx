import Form from "./Form"

export default function TestForm() {
  return (
    <Form
      Prefectures={[
        {
          prefName: "徳島",
          prefCode: 1
        },
        {
          prefName: "香川",
          prefCode: 2
        },
        {
          prefCode: 3,
          prefName: "高知"
        },
        {
          prefCode: 4,
          prefName: "愛媛"
        }
      ]}
    />
  )
}

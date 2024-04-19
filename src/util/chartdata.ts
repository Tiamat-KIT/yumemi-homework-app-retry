export default function ChartInputDataFormatter(
  data: Array<{
    label: string
    data: Array<number>
  }>
) {
  const ResponseDatus = data.map(d => {
    return {
      type: "line",
      name: d.label,
      data: d.data
    }
  })
  if (ResponseDatus.length === 0) {
    throw new Error("Empty data")
  }
  return ResponseDatus
}

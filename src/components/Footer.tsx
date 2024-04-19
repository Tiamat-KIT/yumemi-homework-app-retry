import style from "@/styles/footer.module.css"
export default function Footer() {
  return (
    <footer className={style.container}>
      <h3 className={style.title}>○○ Inc.@{new Date().getFullYear()}</h3>
      <div className={style["flex-malti-list-container"]}>
        <div>About</div>
        <div>Doc</div>
      </div>
    </footer>
  )
}

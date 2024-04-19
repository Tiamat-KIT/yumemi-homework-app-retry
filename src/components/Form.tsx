import style from "@/styles/form.module.css"
export default function Form() {
  return (
    <form className={style.container}>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}

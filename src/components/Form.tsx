export default function Form() {
    return (
        <form style={{
            backgroundColor: "lightgray",
            padding: "1rem",
            textAlign: "center",
            height: "30%"
        }}>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}
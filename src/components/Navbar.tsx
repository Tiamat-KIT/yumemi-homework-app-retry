import style from "@/styles/navbar.module.css";
export default function Navbar() {
    return (
        <nav className={style.container}>
            <h1 style={{color: "black"}}>Navbar</h1>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
            </ul>
        </nav>
    );
}
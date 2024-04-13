export default function Navbar() {
    return (
        <nav style={{
            backgroundColor: "aliceblue",
            color: "white",
            padding: "1rem",
            textAlign: "center",
            height: "10vh"
        }}>
            <h1 style={{color: "black"}}>Navbar</h1>
            <ul style={{
                display: "flex",
                justifyContent: "space-around",
                listStyleType: "none",
            }}>
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
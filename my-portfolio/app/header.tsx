export default function Header (){
    const buttonStyle = "flex bg-emerald-600 p-2 rounded hover:ring-2 transition ease-in-out"
    return (
        <header className="text-emerald-50 bg-emerald-900 container py-4 rounded-b flex flex-row max-w-full gap-x-1 px-2">
            <button className={buttonStyle}>About</button>
            <button className={buttonStyle}>Projects</button>
            <button className={buttonStyle}>Experience</button>
            <button className={buttonStyle}>Contact</button>
        </header>
    )
}
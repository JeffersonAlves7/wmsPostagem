const Header = (
    { links }: {
        links: {id: string, title: string}[]
    }
) => {
    return (
        <header className="bg-slate-100 fixed w-full">
            <nav className=" flex items-center pt-3 pb-3 justify-between container m-auto">
                <h1 className=" text-black text-2xl">Controlador</h1>
                <div className="flex items-center gap-5">
                    {links.map((component, index) => {
                        return (
                            <a key={component.id + index} href={component.id}>{component.title}</a>
                        )
                    })}
                </div>
            </nav>
        </header>
    )
}

export default Header
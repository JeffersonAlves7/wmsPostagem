const Header = () => {
    return (
        <header className="bg-slate-100 fixed w-full">
            <nav className=" flex items-center pt-3 pb-3 justify-between container m-auto">
                <h1 className=" text-black text-2xl">Controlador</h1>

                <div className="flex items-center gap-5">
                    <a href="#enviarPedidos">Enviar Pedidos</a>
                    <a href="#buscarPedidos">Buscar Pedidos</a>
                </div>
            </nav>
        </header>
    )
}

export default Header
import BuscarPedidos from "./components/BuscarPedidos"
import CarregarNotas from "./components/CarregarNotas"
import EnviarPedidos from "./components/EnviarPedidos"
import Header from "./components/Header"
import "./style.scss"

function App() {
  return (
    <div className="App">
      <Header links={ [
        {id: "#enviarPedidos", title: "Enviar Pedidos"},
        {id: "#buscarPedidos", title: "Buscar Pedidos"},
        {id: "#carregarNotas", title: "Carregar Notas"}
      ]}/> 
      <main className="container m-auto">
        <EnviarPedidos/>
        <BuscarPedidos/>
        <CarregarNotas/>
      </main>
    </div>
  )
}

export default App

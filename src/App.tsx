import BuscarPedidos from "./components/BuscarPedidos"
import EnviarPedidos from "./components/EnviarPedidos"
import Header from "./components/Header"
import "./style.scss"

function App() {
  return (
    <div className="App">
      <Header/> 
      <main className="container m-auto">
        <EnviarPedidos/>
        <BuscarPedidos/>
      </main>
    </div>
  )
}

export default App

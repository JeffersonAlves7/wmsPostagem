import BuscarPedidos from "./components/BuscarPedidos";
import CarregarNotas from "./components/CarregarNotas";
import EnviarNotificacao from "./components/EnviarNotificacao";
import EnviarPedidos from "./components/EnviarPedidos";
import EnviarPedidosFlex from "./components/EnviarPedidosFlex";
import Header from "./components/Header";
import "./style.scss";

function App() {
  return (
    <div className="App">
      <Header
        links={[
          { id: "#enviarPedidos", title: "Enviar Pedidos" },
          { id: "#enviarPedidosFlex", title: "Enviar Pedidos Flex" },
          { id: "#buscarPedidos", title: "Buscar Pedidos" },
          { id: "#carregarNotas", title: "Carregar Notas" },
          { id: "#enviarNotificacao", title: "Enviar Notificação" },
        ]}
      />
      <main className="container m-auto">
        <EnviarPedidos />
        <EnviarPedidosFlex />
        <BuscarPedidos />
        <CarregarNotas />
        <EnviarNotificacao />
      </main>
    </div>
  );
}

export default App;

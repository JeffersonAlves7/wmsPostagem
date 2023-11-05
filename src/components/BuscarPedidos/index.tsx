import { useState, ChangeEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import api from "../../api";

type Pedido = {
  chavedeacesso: string;
  nf: string;
  idLista: string;
  pedidoBling: string;
  pedido: string;
  integracao: string;
  qntItens: string;
  situacao:
    | "processando"
    | "emaberto"
    | "embalado"
    | "finalizado"
    | "cancelado";
  alterado: string;
  gerado: string;
};

const keysOfPedidos: (keyof Pedido)[] = [
  "chavedeacesso",
  "nf",
  "idLista",
  "pedidoBling",
  "pedido",
  "integracao",
  "qntItens",
  "situacao",
];

const integracoes: Pedido["integracao"][] = [
  "enviosflex",
  "IntegraCommerce",
  "SkyHub",
  "Kabum",
  "LojaIntegrada",
  "Amazon",
  "Wix",
  "AmazonFullfilment",
  "MercadoLivre",
  "Shopee",
];

const situacoes: Pedido["situacao"][] = [
  "processando",
  "emaberto",
  "embalado",
  "finalizado",
  "cancelado",
];

const PedidoSituacao = ({
  situacao,
  onChange,
}: {
  situacao: Pedido["situacao"];
  onChange: (e: ChangeEvent) => void;
}) => {
  return (
    <select defaultValue={situacao} onChange={onChange}>
      {situacoes.map((currentSituation) => (
        <option
          key={`situation-${currentSituation}`}
          value={currentSituation}
          selected={situacao === currentSituation}
        >
          {currentSituation}
        </option>
      ))}
    </select>
  );
};

const PedidoIntegracao = (props: {
  integracao: Pedido["integracao"];
  onChange(e: ChangeEvent): void;
}) => {
  const { integracao, onChange } = props;

  return (
    <select defaultValue={integracao} onChange={onChange}>
      {integracoes.map((currentIntegration) => (
        <option
          key={`integracao-${currentIntegration}`}
          value={currentIntegration}
          selected={integracao === currentIntegration}
        >
          {currentIntegration}
        </option>
      ))}
    </select>
  );
};

const PedidoComponent = ({
  pedido,
  reloadPedido,
}: {
  pedido: Pedido;
  reloadPedido: () => void;
}) => {
  return (
    <tr>
      {keysOfPedidos.map((key) => {
        if (key === "situacao")
          return (
            <td key={`${pedido.pedidoBling}-${key}`}>
              <PedidoSituacao
                situacao={pedido.situacao}
                onChange={(e) => {
                  const { value } = e.target as HTMLSelectElement;
                  api.putPedido({ ...pedido, situacao: value });
                }}
              />
            </td>
          );
        else if (key == "integracao")
          return (
            <PedidoIntegracao
              integracao={pedido.integracao}
              onChange={(e) => {
                const { value } = e.target as HTMLSelectElement;
                api.putPedido({ ...pedido, integracao: value });
              }}
            />
          );
        else return <td key={`${pedido.pedidoBling}-${key}`}>{pedido[key]}</td>;
      })}
      <td key={`${pedido.pedidoBling}-button`}>
        <button
          onClick={async () => {
            await api.deletePedido(pedido.nf);
            reloadPedido();
          }}
          className=" transition-all bg-red-400 p-2 rounded-lg w-10 border-2 shadow-lg hover:scale-110"
        >
          X
        </button>
      </td>
    </tr>
  );
};

const BuscarPedidos = () => {
  const [busca, setBusca] = useState("");
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const reloadPedidos = async () => {
    api
      .getPedido(busca)
      .then((pedidosFromResponse) => {
        setPedidos(pedidosFromResponse);
      })
      .catch((e) => {
        console.log(`${e}`);
        setPedidos([]);
      });
  };

  return (
    <section
      id="buscarPedidos"
      className="flex items-center justify-center min-h-[30rem] h-[100vh] w-full "
    >
      <div className="flex items-center flex-col gap-4 w-full">
        <h2 className=" text-center text-4xl font-bold">
          Buscar e alterar pedidos
        </h2>
        <div className="flex  min-h-[3rem] max-w-[70rem] shadow-md w-full">
          <input
            type="search"
            onChange={(e) => {
              const value = e.target.value;
              setBusca(value);
            }}
            name="search"
            id="search"
            className="border border-slate-200 text-lg p-2 rounded-md  rounded-r-none w-full"
            placeholder="Buscar pedido"
          />
          <button
            onClick={() => {
              reloadPedidos();
            }}
            className=" border border-l-0 w-[10%] rounded-md rounded-l-none"
          >
            <AiOutlineSearch className=" text-2xl h-full m-auto" />
          </button>
        </div>
        {pedidos.length > 0 && (
          <table>
            <thead>
              <tr>
                {keysOfPedidos.map((key) => (
                  <th key={`header-${key}`}>{key}</th>
                ))}
                <th>Apagar</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <PedidoComponent
                  pedido={pedido}
                  key={pedido.pedidoBling}
                  reloadPedido={reloadPedidos}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default BuscarPedidos;

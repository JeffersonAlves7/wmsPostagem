import { useState } from "react";
import api from "../../api";
import axios from "axios";
import { SubTitle } from "../Texts";
import View from "../View";

function trateNumbers(numbers: string, log = false): string[] {
  const numbersSplitedWithSpaces = numbers.split(" ");
  const numbersWithoutSpaces = numbersSplitedWithSpaces.filter((number) => {
    if (!number) return false;
    return true;
  });
  if (log)
    console.log({ numbers, numbersSplitedWithSpaces, numbersWithoutSpaces });
  return numbersWithoutSpaces;
}

async function postPedidos(numbers: string[]): Promise<string[]> {
  const localErros: string[] = [];

  const num = 10;
  const len = Math.ceil(numbers.length / 10);

  for (let i = 0; i < len; i++) {
    let range = num * (i + 1);
    const nums = [];

    for (let j = range - num; j < range; j++) {
      if (!numbers[j]) break;
      nums.push(numbers[j]);
    }

    try {
      const response = await api.postPedidosFlex(nums);
      response.forEach((res) => {
        if (res.error) {
          localErros.push(res.pedidoBling);
        }
      });
    } catch (e) {
      localErros.push("Erro inesperado ao postar os pedidos");
    }
  }

  return localErros;
}

const enviarMensagem = async () => {
  try {
    await api.enviarNotificacao("Chegaram novos pedidos!");
  } catch (error) {
    console.error("Erro ao enviar mensagem para o bot do Discord:", error);
  }
};

const EnviarPedidosFlex = () => {
  const [erros, setErros] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<any[]>([]);

  const handleClick = async () => {
    const { value } = document.querySelector(
      "#textArea"
    ) as HTMLTextAreaElement;
    const numbersArray = trateNumbers(value ?? "");
    setErros([]);
    setSuccess([]);
    setLoading(true);
    const erros = await postPedidos(numbersArray);
    const sucessos = numbersArray.filter(
      (number) => !erros.find((v) => v === number)
    );
    setSuccess(sucessos);
    if (sucessos?.length > 0) enviarMensagem();
    if (erros.length > 0) {
      setErros(erros);
    }
    setLoading(false);
  };

  return (
    <View id="enviarPedidosFlex">
      <div className="flex items-center flex-col gap-4 w-full max-w-[70rem]">
        <SubTitle>Enviar Pedidos Flex</SubTitle>
        <div className="flex flex-col gap-4">
          {success.length > 0 && (
            <ul className=" flex flex-wrap gap-2 bg-green-300 rounded-md p-2">
              <span>Sucesso: </span>
              {success.map((suc, i) => (
                <li key={suc + "-" + i}>{suc}</li>
              ))}
            </ul>
          )}
          {erros.length > 0 && (
            <ul className=" flex flex-wrap gap-2 bg-red-300 rounded-md p-2">
              <span>Erros: </span>
              {erros.map((erro, i) => (
                <li key={erro + "-" + i}>{erro}</li>
              ))}
            </ul>
          )}
        </div>
        <textarea
          name="textArea"
          id="textArea-2"
          placeholder="Insira os números"
          className=" border border-slate-200 w-full min-h-[8rem] text-lg p-2 rounded-md shadow-md"
        ></textarea>
        <div className="self-start  flex gap-4 items-center justify-center">
          <button
            onClick={handleClick}
            className="p-2 rounded-md text-white bg-blue-600 pl-3 pr-3"
          >
            Enviar
          </button>
          <div>{loading && <span id="loading"></span>}</div>
        </div>
      </div>
    </View>
  );
};

export default EnviarPedidosFlex;

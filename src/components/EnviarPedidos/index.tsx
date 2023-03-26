import { useState } from "react"
import api from "../../api"

function trateNumbers(numbers: string, log = false): string[] {
  const numbersSplitedWithSpaces = numbers.split(" ")
  const numbersWithoutSpaces = numbersSplitedWithSpaces.filter(
    number => {
      if (!number) return false
      return true
    }
  )
  if (log) console.log({ numbers, numbersSplitedWithSpaces, numbersWithoutSpaces })
  return numbersWithoutSpaces
}

async function postPedidos(numbers: string[]): Promise<string[]> {
  const localErros: string[] = [];

  const num = 10
  const len = Math.ceil(numbers.length / 10)

  for (let i = 0; i < len; i++) {
    let range = num * (i + 1)
    const nums = []

    for (let j = range - num; j < range; j++) {
      if (!numbers[j]) break
      nums.push(numbers[j])
    }

    try {
      const response = await api.postPedidos(nums)
      response.forEach(res => {
        if (res.error) {
          localErros.push(res.pedidoBling)
        }
      })
    }
    catch (e) {
      localErros.push("Erro inesperado ao postar os pedidos")
    }
  }

  return localErros
}

const EnviarPedidos = () => {
  const [erros, setErros] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <section id="enviarPedidos" className="flex gap-6 items-center justify-center h-[100vh] w-full flex-col">
      <div className="flex items-center flex-col gap-4 w-full max-w-[70rem]">
        <h2 className=" text-center text-4xl font-bold">Enviar Pedidos para o WMS</h2>
        <div>
          {
            erros.length > 0 &&
            <ul className=" flex flex-wrap gap-2 bg-red-300 rounded-md p-2">
              <span>Erros: </span>
              {erros.map((erro, i) => <li key={erro + '-' + i}>{erro}</li>)}
            </ul>
          }
        </div>
        <textarea name="textArea" id="textArea" placeholder="Insira os números"
          className=" border border-slate-200 w-full min-h-[8rem] text-lg p-2 rounded-md shadow-md"
        ></textarea>
        <div className="self-start  flex gap-4 items-center justify-center">
          <button onClick={async () => {
            const { value } = document.querySelector("#textArea") as HTMLTextAreaElement
            const numbersArray = trateNumbers(value ?? "")
            setLoading(true)
            const erros = await postPedidos(numbersArray)
            setErros(erros)
            setLoading(false)
          }} className="p-2 rounded-md text-white bg-blue-600 pl-3 pr-3">
            Enviar
          </button>
          <div>
            {loading && <span id="loading" ></span>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EnviarPedidos

import axios from "axios"

class Api {
  public api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

  async getPedido(busca: string = '') {
    const res = await this.api.get(`/pedidos/buscar?busca=${busca}`)
    return (res.data as { response: [] }).response ?? []
  }

  async putPedido({ chavedeacesso, situacao }: { chavedeacesso: string, situacao: string }) {
    try {
      const res = await this.api.put("/pedidos", { chavedeacesso, situacao })
      console.log(res.data)
      return res.data
    }
    catch (e) {
      console.log(`Error - put Pedido: ${e}`)
      throw e
    }
  }

  async deletePedido(nf: string) {
    try {
      const res = await this.api.delete("/pedido", { data: { nf } })
      const { data } = res
      console.log(data)
      return data
    }
    catch (e) {
      console.log(`Error - delete Pedido: ${e}`)
      throw e
    }
  }

  async postPedidos(numbers: string[]): Promise<{ pedidoBling: string, error?: boolean }[]> {
    try {
      const res = await this.api.post("/pedidos", { numPedido: numbers })
      const { data } = res
      return data
    }
    catch (e) {
      console.log(`Error - post Pedido: ${e}`)
      throw e
    }
  }

  async getPastasNotas(): Promise<string[]>{
    const { data } = await this.api.get("/notas/etiquetas")
    return data
  }

  async carregarNotas(caminho: string): Promise<void>{
    return this.api.get(`/notas/carregar/${caminho}`)
  }

  async carregarTodasAsNotas(): Promise<void>{
    return this.api.get(`/notas/carregar`)
  }
}

const api = new Api()

export default api

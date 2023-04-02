import { useEffect, useState } from "react"
import { SubTitle } from "../Texts"
import api from "../../api"
import View from "../View"

const CarregarNotas = () => {
    const [notas, setNotas] = useState<string[]>([])

    return (
        <View id="carregarNotas">
            <SubTitle>Carregar Notas</SubTitle>

            <div className="flex items-center justify-center gap-6">
                <button
                    className="p-2 rounded-md text-white bg-gray-600 pl-3 pr-3"
                    onClick={() => {
                        api.getPastasNotas().then(notas => {
                            setNotas(notas)
                        }).catch(e => {
                            console.error(`Erro ao carregar notas - ${e}`)
                        })
                    }}>
                    Buscar Pastas
                </button>
                <button
                    className=" p-2 bg-orange-600 text-white rounded-md"
                    onClick={() => {
                        api.carregarTodasAsNotas()
                            .then(() => {
                                api.getPastasNotas()
                                    .then(notas => { setNotas(notas) })
                                    .catch(e => { console.error(`Erro ao carregar notas - ${e}`) })
                            })
                            .catch(e => { })
                    }}
                >
                    Carregar Tudo
                </button>

            </div>

            <ul className="flex gap-4 flex-col w-[17rem] ">
                {notas.map((nota, index) => (
                    <li
                        className="flex items-center gap-2 justify-between"
                        key={nota + index}
                    >
                        <p className="underline text-center">{nota}</p>
                        <button
                            className=" p-2 bg-gray-600 text-white rounded-md"
                            onClick={() => {
                                api.carregarNotas(nota)
                                    .then(() => {
                                        api.getPastasNotas()
                                            .then(notas => { setNotas(notas) })
                                            .catch(e => { console.error(`Erro ao carregar notas - ${e}`) })
                                    })
                                    .catch(e => { })
                            }}
                        >
                            Carregar
                        </button>
                    </li>
                ))}
            </ul>

        </View>
    )
}

export default CarregarNotas
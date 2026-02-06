import { useState } from "react"
import type { Cep } from "./types/Cep"
import api from "./services/api"
import "./App.css"

export function Project(){
    const[cep,setCep] = useState<string>("")
    const [endereco, setEnderco] = useState<Cep | null>(null)
    const[erro,setErro] = useState<string>("")

async function buscarCep() {
    try {

        setErro("")
        const response = await api.get(`/${cep}/json`)
        setEnderco(response.data)

    }
    catch{
        setErro("Cep Inválido. Digite Novamente")
        setEnderco(null)
    }
}

    return(
        <div>

            <input 
            value={cep}
            onChange={e => setCep(e.target.value)}
            placeholder="Digite um CEP Válido"
            />
            <button onClick={buscarCep}>Consultar</button>

            {erro &&<p style={{color:"red"}}>{erro}</p>}
            {endereco && (
                <div>
                    <p>Rua:{endereco.logradouro}</p>
                    <p>Bairro: {endereco.bairro}</p>
                    <p>Cidade: {endereco.localidade}</p>
                    <p>Estado: {endereco.uf}</p>
                </div>

            )}
        </div>
    )
}
import styled from "styled-components"
import {useContext, useState, useEffect} from "react"
import { port } from "../port"
import { useNavigate, useParams } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import axios from "axios"

export default function TransactionsPage() {
  const [value, setValue] = useState(0)
  const [description, setDescription] = useState("")
  const lsUser = JSON.parse(localStorage.getItem("token"))

  const {tipo} = useParams()
  const {token} = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if(lsUser === null || lsUser === undefined){
      navigate("/")
    }
  }, [])

  function sendBalance(e){
    e.preventDefault()

    const body = {value, description}
    const url = `${port}/nova-transacao/${tipo}`
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    axios.post(url, body, config).then(() => navigate("/home")).catch(fail => console.log(fail.response, "deu errado"))
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={sendBalance}> 
        <input placeholder="Valor" type="text" onChange={(e) => setValue(e.target.value)}/>
        <input placeholder="Descrição" type="text" onChange={(e) => setDescription(e.target.value)}/>
        <button type="subtmit">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`

import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { port } from "../port"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigate = useNavigate()

  function signUp(e){
    e.preventDefault()


    if(password !== confirmPassword) return alert("As senhas nao coincidem")

    const url = `${port}/cadastro`
    const body = {name, email, password}

    axios.post(url, body)
      .then(() => navigate("/"))
      .catch((fail) => {
        alert(fail.response.data)
      })
  }

  return (
    <SingUpContainer>
      <form onSubmit={signUp}> 
        <MyWalletLogo />
        <input placeholder="Nome" type="text" onChange={(e) => setName(e.target.value)} required/>
        <input placeholder="E-mail" type="email" onChange={(e) => setEmail(e.target.value)} required/>
        <input placeholder="Senha" type="password" autocomplete="new-password" onChange={(e) => setPassword(e.target.value)} required/>
        <input placeholder="Confirme a senha" type="password" autocomplete="new-password" onChange={(e) => setConfirmPassword(e.target.value)} required/>
        <button type="submit">Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

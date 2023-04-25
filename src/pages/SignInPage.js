import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import UserContext from "../contexts/UserContext"
import {useContext, useState} from "react"
import { port } from "../port"
import { useEffect } from "react"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const lsUser = JSON.parse(localStorage.getItem("token"))

  const navigate = useNavigate()

  useEffect(() => {
    if(lsUser === null){
      navigate("/")
    } else {
      navigate("/home")
    }
  }, [])

  const {setUsername, setToken} = useContext(UserContext)

  function SignIn(e){
    e.preventDefault()

    const url = `${port}/`
    const body = {email, password}
    axios.post(url, body)
      .then((sucess) => {
        setToken(sucess.data.token)
        setUsername(sucess.data.getUsername.name)
        localStorage.setItem("token", JSON.stringify({username: sucess.data.getUsername.name, token: sucess.data.token}))
        navigate("/home")
      })
      .catch((fail) => alert(fail.response.data))
  }

  return (
    <SingInContainer>
      <form onSubmit={SignIn}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" required onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder="Senha" type="password" autocomplete="new-password" required onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Entrar</button>
      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

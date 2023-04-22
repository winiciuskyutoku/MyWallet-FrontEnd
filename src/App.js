import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import UserContext from "./contexts/UserContext"
import {useState} from "react"

export default function App() {
  const [token, setToken] = useState("")
  const [username, setUsername] = useState("")

  return (
    <UserContext.Provider value={{token, setToken, username, setUsername}}>
      <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage setToken={setToken}/>} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage token={token}/>} />
          <Route path="/nova-transacao/:tipo" element={<TransactionsPage token={token}/>} />
        </Routes>
      </BrowserRouter>
    </PagesContainer>
    </UserContext.Provider>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`

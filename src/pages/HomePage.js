import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import { port } from "../port"
import { useContext, useState } from "react"
import UserContext from "../contexts/UserContext"
import { useEffect } from "react"
import axios from "axios"

export default function HomePage() {

  const lsUser = JSON.parse(localStorage.getItem("token"))
  const [balanceList, setBalanceList] = useState([])
  const [values, setvalues] = useState(0)
  const { token, username } = useContext(UserContext)

  const navigate = useNavigate()
  
  useEffect(() => {
    if(lsUser === null || lsUser === undefined){
      navigate("/")
    }

    const url = `${port}/home`
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    axios.get(url, config).then(sucess => {
      setBalanceList(sucess.data)

      const valores = sucess.data

      const filteredValues = valores.map(v => {

        if(v.tipo === "entrada"){
          return Number(v.value)
        } else if (v.tipo === "saida"){
          return Number(-v.value)
        }
      })

      setvalues(filteredValues.reduce((prev, e) => prev + e, 0))
      
    }).catch(fail => console.log(fail.data))
  }, [])

  function logout(){
    const url = `${port}/sessions`

    console.log(token)
    axios.delete(url, {userToken: token})
    .then(() => {
      localStorage.removeItem("token")
      navigate("/")
    })
    .catch(fail => console.log(fail))
  }

  if (balanceList.length === 0) {
    return (
      <HomeContainer>
        <Header>
          <h1>Olá, {username}</h1>
          <BiExit onClick={logout}/>
        </Header>
        <EmptyContainer>
          <p>
            Nao ha registros de entrada ou saida
          </p>
        </EmptyContainer>


        <ButtonsContainer>
          <StyledLink to={"/nova-transacao/entrada"}>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </StyledLink>
          <StyledLink to={"/nova-transacao/saida"}>
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </StyledLink>
        </ButtonsContainer>
      </HomeContainer>

    )
  } else {
    return (
      <HomeContainer>
        <Header>
          <h1>Olá, {username}</h1>
          <BiExit onClick={logout}/>
        </Header>

        <TransactionsContainer>
          <ul>
            {balanceList.map(e => {
              return (
                <ListItemContainer>
                  <div>
                    <span>{e.today}</span>
                    <strong>{e.description}</strong>
                  </div>
                  <Value color={e.tipo === "entrada" ? "positivo" : "negativo"}>{e.value}</Value>
                </ListItemContainer>
              )
            })}
          </ul>

          <article>
            <strong>Saldo</strong>
            <Value color={values >= 0 ? "positivo" : "negativo"}>{values.toFixed(2)}</Value>
          </article>
        </TransactionsContainer>


        <ButtonsContainer>
          <StyledLink to={"/nova-transacao/entrada"}>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </StyledLink>
          <StyledLink to={"/nova-transacao/saida"}>
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </StyledLink>
        </ButtonsContainer>

      </HomeContainer>
    )
  }


}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`

const EmptyContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    color: #868686;
  }
`

const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`

const StyledLink = styled(Link)`
  width: 50%;
  height: 115px;
  font-size: 22px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #A328D6;
  padding: 20px;

  p{
    font-size: 18px;
  }
`